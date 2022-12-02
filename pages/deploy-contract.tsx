import { Abi, CodePromise } from '@polkadot/api-contract'
import { BN } from '@polkadot/util'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import LoadingButton from '../components/LoadingButton/LoadingButton'
import { useToast } from '../hooks'
import { useLoading } from '../hooks/useLoading'
import { useSendingTx } from '../hooks/useSendingTx'

const WS_PROVIDER = 'ws://127.0.0.1:9944'

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

interface Metadata {
  accountId: string
  argValues?: Record<string, unknown>
  value?: BN
  metadata?: Abi
  name: string
  constructorIndex: number
  salt?: string
  storageDepositLimit?: BN
  weight: BN
  codeHash?: string
}

export default function DeployContract() {
  const { connect } = useSendingTx()
  const { showErrorToast } = useToast()
  const { isLoading, endLoading, startLoading } = useLoading()

  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [metadata, setMetadata] = useState<Abi | null>(null)
  const [constructorParams, setConstructorParams] = useState<ConstructorState[]>([])
  const [deployOptions, setDeployOptions] = useState<DeployState>({
    salt: '',
    gasLimit: 200000,
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
      const utf8decoder = new TextDecoder()

      const data = new Uint8Array(loadedFile.target?.result as ArrayBuffer)
      const json = JSON.parse(utf8decoder.decode(data)) as Record<string, unknown>

      const api = await connect(WS_PROVIDER)

      const value = new Abi(json, api?.registry.getChainProperties())

      setFile(file)
      setMetadata(value)
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
      const sub = await tx.signAndSend(account, { signer: injector?.signer || undefined })

      setResult({
        error: false,
        status: 'success',
        data: sub.toHuman()?.toString() || '',
      })

      setDeployOptions({
        salt: '',
        gasLimit: 0,
        storageDepositLimit: 0,
        value: 0,
      })

      setFile(null)
    } catch (error) {
      showErrorToast(error as string)
      setResult({
        error: true,
        status: 'error',
        data: String(error),
      })
    }
    endLoading()
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
        <div className="d-flex mb-3 align-items-center">
          <Button onClick={() => console.log(fileRef?.current?.click())}>Upload contract</Button>
          <p className="my-0 ms-4">{file?.name}</p>
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
                  <Row key={index.toString()} className="mb-2">
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

            <Row className="mb-2">
              <Col xs="12">
                <b>Max gas allowed</b>
                <input
                  type="text"
                  className="form-control"
                  value={deployOptions.gasLimit}
                  onChange={({ target }) => updateDeployOptions('gasLimit', target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs="12">
                <b>storage deposit</b>
                <input
                  type="text"
                  className="form-control"
                  value={deployOptions.storageDepositLimit}
                  onChange={({ target }) => updateDeployOptions('storageDepositLimit', target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-4 d-flex justify-content-end">
              <Col xs="3">
                <LoadingButton
                  className="ink-button ink-button_violet mt-3"
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={onSubmit}
                  text="submit"
                />
              </Col>
            </Row>
          </>
        )}
        {result.data && (
          <div className="mt-4">
            <p className="text-break">Deployed to: {result.data}</p>
          </div>
        )}
      </Row>
    </>
  )
}
