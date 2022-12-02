import { Abi, CodePromise } from '@polkadot/api-contract'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useSendingTx } from '../hooks/useSendingTx'

const WS_PROVIDER = 'ws://127.0.0.1:9944'

export default function DeployContract() {
  const { connect } = useSendingTx()

  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [constructorParams, setConstructorParams] = useState([])
  const [deployOptions, setDeployOptions] = useState({
    salt: '',
    gasLimit: 0,
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

    try {
      const { web3FromAddress, web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')

      const wasm = metadata?.info?.source.wasm

      const api = await connect(WS_PROVIDER)

      const constructor = metadata?.findConstructor(0)

      const codeOrBlueprint = new CodePromise(api, metadata, wasm && wasm.toU8a?.())

      const options = {
        gasLimit: 1104389514,
        salt: null,
        storageDepositLimit: undefined,
        value: undefined,
      }

      const extensions = await web3Enable('Ink! Explorer')
      if (extensions?.length === 0) return

      const accounts = await web3Accounts()
      const accountId = accounts[0].address

      const injector = await web3FromAddress(accountId as any)
      const account = accountId

      const tx = codeOrBlueprint.tx[constructor.method](options, 1000)
      const sub = await tx.signAndSend(account, { signer: injector?.signer || undefined })

      setResult({
        error: false,
        status: 'success',
        data: sub.toHuman()?.toString() || '',
      })
    } catch (error) {
      console.log(error)
      setResult({
        error: true,
        status: 'error',
        data: String(error),
      })
    }
  }

  useEffect(() => {
    if (!metadata) {
      setConstructorParams([])
    }

    const params = metadata?.constructors[0]?.args?.map((c) => ({
      name: c.name,
      value: '',
      type: c.type,
    }))

    setConstructorParams(params)
  }, [metadata])

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
        {metadata?.json && (
          <>
            {metadata?.constructors[0]?.args.length > 0 && (
              <>
                <p className="mb-0">constructor: </p>
                {constructorParams?.map((c) => (
                  <Row className="mb-2">
                    <Col xs="12">
                      <b>
                        {c.name} : {c?.type?.type}
                      </b>
                      <input
                        type="text"
                        className="form-control"
                        value={c.value}
                        // onChange={(e) => {
                        //   updateOptions(query.method, 'value', e.target.value)
                        // }}
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
                  // onChange={(e) => {
                  //   updateOptions(query.method, 'value', e.target.value)
                  // }}
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
                  // onChange={(e) => {
                  //   updateOptions(query.method, 'value', e.target.value)
                  // }}
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs="12">
                <Button onClick={onSubmit}>submit</Button>
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
