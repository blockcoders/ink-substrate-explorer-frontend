import { Abi, CodePromise } from '@polkadot/api-contract'
import { BN } from '@polkadot/util'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import LoadingButton from '../components/LoadingButton/LoadingButton'
import { useToast } from '../hooks'
import { useFormatIntl } from '../hooks/useFormatIntl'
import { useLoading } from '../hooks/useLoading'
import { useSendingTx } from '../hooks/useSendingTx'

const WS_PROVIDER = process.env.WS_PROVIDER || 'ws://127.0.0.1:9944'

interface DeployState {
  salt?: string
  gasLimit: number
  storageDepositLimit: number
  value?: number
}

interface ConstructorState {
  name: string
  value: any
  type: string
}

export default function DeployContract() {
  const { format } = useFormatIntl()
  const { connect } = useSendingTx()
  const { showErrorToast } = useToast()
  const { isLoading, endLoading, startLoading } = useLoading()

  const fileRef = useRef(null)
  const [showMessages, setShowMessages] = useState(false)
  const [file, setFile] = useState(null)
  const [metadata, setMetadata] = useState<Abi | null>(null)
  const [constructorParams, setConstructorParams] = useState<ConstructorState[]>([])
  const [deployOptions, setDeployOptions] = useState<DeployState>({
    salt: '',
    gasLimit: 10000000000,
    storageDepositLimit: 0,
    value: 0,
  })
  const [result, setResult] = useState({
    status: '',
    error: false,
    data: '',
  })

  const onChangeFile = (file: any) => {
    if (!file) {
      setFile(null)
      setMetadata(null)
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = async (loadedFile) => {
      try {
        const utf8decoder = new TextDecoder()

        const data = new Uint8Array(loadedFile.target?.result as ArrayBuffer)
        const json = JSON.parse(utf8decoder.decode(data)) as Record<string, unknown>

        const api = await connect(WS_PROVIDER)

        const value = new Abi(json, api?.registry.getChainProperties())

        if (!value?.info?.source?.wasm) {
          return showErrorToast('Invalid file, wasm is missing')
        }

        setFile(file)
        setMetadata(value)
      } catch (error) {
        return showErrorToast('Invalid file, please upload a contract file')
      }
    }
  }

  const onSubmit = async () => {
    if (!metadata) return

    startLoading()
    try {
      const { web3FromAddress, web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')

      const wasm = metadata?.info?.source.wasm

      const api = await connect(WS_PROVIDER)

      const constructor = metadata?.findConstructor(0)

      const codeOrBlueprint = new CodePromise(api, metadata, wasm && wasm.toU8a?.())

      const options = {
        gasLimit: deployOptions.gasLimit,
        salt: null,
        storageDepositLimit: deployOptions.storageDepositLimit || undefined,
        value: undefined,
      }

      const extensions = await web3Enable('Ink! Explorer')
      if (extensions?.length === 0) return

      const accounts = await web3Accounts()
      const accountId = accounts[0].address

      const injector = await web3FromAddress(accountId as any)
      const account = accountId

      const params = constructorParams.map((el) => el.value)

      const tx = codeOrBlueprint.tx[constructor.method](options, ...params)
      await tx.signAndSend(
        account,
        { signer: injector?.signer || undefined },
        ({ events, status, txHash, dispatchError, dispatchInfo, internalError }) => {
          const res: any = {
            status: status.toString(),
            txHash: txHash.toString() || '',
            dispatchError: dispatchError?.toString() || '',
            dispatchInfo: dispatchInfo?.toString() || '',
            internalError: internalError?.toString() || '',
            events: events.map((e) => ` ${e.event.method}`).toString() || '',
          }

          const contractAddressIndex = events.findIndex((evt) =>
            evt.event.method.toString().toLowerCase().includes('newaccount'),
          )

          const contractAddress = events[contractAddressIndex].event.data[0].toString()

          if (contractAddress) res['contract address'] = contractAddress || ''

          if (dispatchError?.toString()) {
            setResult({
              error: true,
              status: 'error',
              data: res,
            })
          } else if (dispatchInfo?.toString()) {
            setResult({
              error: false,
              status: 'success',
              data: res,
            })
          }

          setDeployOptions({
            salt: '',
            gasLimit: 10000000000,
            storageDepositLimit: 0,
            value: 0,
          })

          setMetadata(null)

          setFile(null)
          endLoading()
        },
      )
    } catch (error) {
      showErrorToast(error as string)
      setResult({
        error: true,
        status: 'error',
        data: {
          error: String(error),
        },
      })
      endLoading()
    }
  }

  useEffect(() => {
    if (!metadata) {
      setConstructorParams([])
    }

    const params = metadata?.constructors[0]?.args?.map((c) => ({
      name: c.name,
      value: '',
      type: c.type.type,
    }))

    setConstructorParams(params || [])
  }, [metadata])

  const updateConstructorParams = (index: number, value: any) => {
    setConstructorParams((state) => state.map((p, _index) => (_index === index ? { ...p, value } : p)))
  }

  const updateDeployOptions = (name: string, value: any) => {
    setDeployOptions((state) => ({
      ...state,
      [name]: value,
    }))
  }

  return (
    <>
      <Row className="mb-5" data-testid="header-links">
        <div className="d-flex mb-3 align-items-center justify-content-between">
          <p className="my-0 ms-1">{file && `uploading: ${file.name}`}</p>
          <Button className="ink-Buttonton ink-button_small" onClick={() => console.log(fileRef?.current?.click())}>
            {format('upload_contract')}
          </Button>
          <input
            ref={fileRef}
            style={{ display: 'none' }}
            type="file"
            onChange={({ target }) => onChangeFile(target.files?.[0] || null)}
          />
        </div>

        {metadata && (
          <>
            {metadata?.constructors[0]?.args.length > 0 && (
              <>
                <p className="mb-0">constructor: </p>
                {constructorParams?.map((c, index) => (
                  <Row key={index.toString()} className="mb-2 ps-5">
                    <Col xs="12">
                      <b>
                        {c.name} : {c?.type}
                      </b>
                      <input
                        type="text"
                        className="form-control"
                        value={c.value || ''}
                        onChange={({ target }) => updateConstructorParams(index, target.value)}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            )}
            <Row className="mb-4">
              <Col xs="12">
                <b>{format('gas_limit')}</b>
                <input
                  type="text"
                  className="form-control"
                  value={deployOptions.gasLimit}
                  onChange={({ target }) => updateDeployOptions('gasLimit', target.value)}
                />
              </Col>
            </Row>

            {metadata?.messages.length > 0 && (
              <>
                <Row>
                  <Col xs="3" className="mb-3">
                    <button className="ink-button ink-button_small" onClick={() => setShowMessages(!showMessages)}>
                      {format('methods')}({metadata?.messages?.length || 0})
                    </button>
                  </Col>
                  <Col xs="12">
                    {showMessages &&
                      metadata?.messages?.map((msg, index) => (
                        <Row key={index.toString()} className="mb-2">
                          <Col xs="12">
                            <p className="mb-0 fw-bold">
                              {msg.method}({`${msg.args.map((a) => `${a.name} : ${a.type.type}`).join(' ')}`})
                            </p>
                            <p>{msg.docs[0]}</p>
                          </Col>
                        </Row>
                      ))}
                  </Col>
                </Row>
                <Row className="mb-4 d-flex justify-content-end">
                  <Col xs="3">
                    <LoadingButton
                      className="ink-button ink-button_violet mt-3"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={onSubmit}
                      text={format('submit')}
                    />
                  </Col>
                </Row>
              </>
            )}
          </>
        )}

        <Col>
          {result.data && (
            <>
              <div className="mt-4">
                <p className="fw-bold">Result:</p>
              </div>
              <div className="tx-result-deploy">
                {Object.keys(result.data)
                  .filter((k) => !k.startsWith('_'))
                  .map((c, index) => (
                    <Row key={index.toString()} className="my-3">
                      <Col className="text-break" xs="12">
                        {c}: {result?.data[c]}
                      </Col>
                    </Row>
                  ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  )
}
