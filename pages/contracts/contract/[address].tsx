import { ApiPromise, WsProvider } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import hljs from 'highlight.js'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
import 'highlight.js/styles/github.css'
import Accordion from 'react-bootstrap/Accordion'
import verifed from '../../../assets/img/verifed.svg'
import { useGetContractQueriesQuery, GetContractQueriesQuery, useUploadMetadataMutation } from '../../../generated'
import withApollo from '../../../lib/withApollo'

const WS_PROVIDER = process.env.WS_PROVIDER || 'ws://127.0.0.1:9944'
const DEFAULT_OPTIONS = { gasLimit: '', storageLimit: '', value: '' }

const getArgName = (arg: string) => {
  const { name } = JSON.parse(arg)
  return name
}

const getArgType = (arg: string) => {
  const {
    type: { type },
  } = JSON.parse(arg)
  return type
}

const connect = async (provider: string | string[] | undefined) => {
  return ApiPromise.create({ provider: new WsProvider(provider) })
}

const Contract: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string

  const { data } = useGetContractQueriesQuery({ variables: { address } })
  const contract = get(data, 'getContractQueries', []) as GetContractQueriesQuery['getContractQueries']

  const [options, setOptions] = useState()
  const [account, setAccount] = useState('')
  const [results, setResults] = useState<any>()
  const [extensionDapp, setExtensionDapp] = useState<any>()
  const [parameters, setParameters] = useState()
  const [base64Abi, setBase64Abi] = useState('')

  const getDefaultResults = () => {
    const res: any = {}
    contract?.queries?.forEach((query) => {
      const { method } = query
      res[method] = {}
    })
    return res
  }

  const setDefaultResults = () => {
    if (results) return
    setResults(getDefaultResults())
  }

  const getDefaultOptions = () => {
    const op: any = {}
    contract?.queries?.forEach((query) => {
      const { method } = query
      op[method] = DEFAULT_OPTIONS
    })
    return op
  }

  const setDefaultOptions = () => {
    if (options) return
    setOptions(getDefaultOptions())
  }

  const getDefaultParameters = () => {
    const params: any = {}
    contract?.queries?.forEach((query) => {
      const { args, method } = query
      params[method] = {}
      args.forEach((arg) => {
        const { name } = JSON.parse(arg)
        params[method][name] = ''
      })
    })
    return params
  }

  const setDefaultParameters = () => {
    if (parameters) return
    const params = getDefaultParameters()
    setParameters(params)
  }

  const setDefautls = async () => {
    setDefaultOptions()
    setDefaultParameters()
    setDefaultResults()
    const edapp = await import('@polkadot/extension-dapp')
    extensionSetup(edapp)
  }

  const updateOptions = (method: string, arg: 'gasLimit' | 'storageLimit' | 'value', value: string) => {
    let op
    if (!options) {
      op = getDefaultOptions()
    } else {
      op = { ...(options as any) }
    }
    op[method][arg] = value
    setOptions(op)
  }

  const updateParams = (method: string, arg: string, value: string) => {
    let params
    if (!parameters) {
      params = getDefaultParameters()
    } else {
      params = { ...(parameters as any) }
    }
    params[method][arg] = value
    setParameters(params)
  }

  useEffect(() => {
    hljs.highlightAll()
  }, [])

  const [uploadMetadataMutation] = useUploadMetadataMutation({
    variables: { contractAddress: '', metadata: '' },
  })

  const extensionSetup = async (extension: any) => {
    const { web3Accounts, web3Enable } = extension
    const extensions = await web3Enable('Ink! Explorer')
    if (extensions.length === 0) {
      console.log('No extension installed!')
      return
    }
    const accounts = await web3Accounts()
    setAccount(accounts[0].address)
    setExtensionDapp(extension)
  }

  const send = async (method: string) => {
    if (!parameters) return
    if (!options) return
    if (!results) return
    if (!contract) return
    if (!extensionDapp) return
    try {
      const api = await connect(WS_PROVIDER)
      const { metadata } = contract || {}
      if (!metadata) {
        throw new Error('Contract metadata not found')
      }
      const abi = new Abi(metadata)
      const contractPromise = new ContractPromise(api, abi, address)
      const query = contractPromise.query[method]
      const tx = contractPromise.tx[method]
      if (!query || !tx) {
        throw new Error('Query/Transaction method not found')
      }
      const values = Object.values(parameters[method]) || []
      let result
      if (query.meta.isMutating) {
        console.log('extensionDapp', extensionDapp)
        const injector = await extensionDapp.web3FromAddress(account)
        result = await tx(options, ...values).signAndSend(account, { signer: injector?.signer || undefined })
      } else {
        result = await query(account, options[method], ...values)
      }
      console.log('RESULT', result)
      setResults({ ...results, [method]: result })
    } catch (error) {
      console.log(error)
    }
  }

  const uploadAbi = async () => {
    try {
      await uploadMetadataMutation({ variables: { contractAddress: address, metadata: base64Abi } })
    } catch (error) {
      console.log(error)
    } finally {
      setBase64Abi('')
    }
  }
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href={'/contracts/transactions/' + address}>
            <button className="ink-button ink-button_violetligth">Transactions</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/contract/' + address}>
            <button className="ink-button ink-button_violet">Contract</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/events/' + address}>
            <button className="ink-button ink-button_violetligth">Events</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs className="mb-3 ink-tab" defaultActiveKey="contractAbi">
            <Tab className="ink-tab_button" eventKey="contractAbi" title="Contract ABI">
              <Row>
                <Col className="my-3" xs={12}>
                  {contract?.metadata && (
                    <>
                      <Image src={verifed} alt="Icon" />
                      <b> Contract ABI Verified</b>
                    </>
                  )}
                </Col>
                <Col xs={12}>
                  <textarea
                    className="form-control"
                    rows={15}
                    placeholder="No metadata found. Upload your contract metadata to verify your contract."
                    value={contract?.metadata || 'Not found'}
                    readOnly
                  ></textarea>
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="uploadAbi" title="Upload ABI">
              <Row>
                <Col xs="12" className="mt-3">
                  <textarea
                    className="form-control"
                    rows={12}
                    placeholder="Plase upload the metadata of the contract in a Base64 encoded format."
                    onChange={(e) => setBase64Abi(e.target.value)}
                  ></textarea>
                </Col>
                <Col className="my-3" xs={12}>
                  <button className="ink-button ink-button_violet mt-3" onClick={() => uploadAbi()}>
                    Upload
                  </button>
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="Read" title="Run contract methods" onClick={() => setDefautls()}>
              <Row>
                <Col className="my-5">
                  {contract?.queries && contract?.queries.length > 0 ? (
                    <Accordion className="ink-accordion" defaultActiveKey={['0']}>
                      {contract?.queries?.map((query, index) => (
                        <Accordion.Item key={index} eventKey={`${index}`} className="ink-accordion_item">
                          <Accordion.Header>{query.name}</Accordion.Header>
                          <Accordion.Body>
                            {query.docs}
                            {query.args.length > 0 && (
                              <Row className="my-3">
                                <Col xs="12">
                                  <b>Method Arguments</b>
                                </Col>
                              </Row>
                            )}
                            {query.args.map((arg, i) => (
                              <Row key={index + '-' + i} className="my-3">
                                <Col xs="12">
                                  <b>{getArgName(arg)}</b>
                                  <input
                                    type="text"
                                    className="form-control ink_searchbar-input"
                                    placeholder={getArgType(arg)}
                                    onChange={(e) => {
                                      const { method } = query
                                      const { value } = e.target
                                      updateParams(method, getArgName(arg), value)
                                    }}
                                  />
                                </Col>
                              </Row>
                            ))}
                            <Row className="my-3">
                              <Col xs="12">
                                <b>Options</b>
                              </Col>
                            </Row>
                            <Row key={`gasLimit-${index}`} className="my-3">
                              <Col xs="12">
                                <b>gasLimit</b>
                                <input
                                  type="text"
                                  className="form-control ink_searchbar-input"
                                  placeholder="200000000000"
                                  onChange={(e) => {
                                    updateOptions(query.method, 'gasLimit', e.target.value)
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row key={`storageLimit-${index}`} className="my-3">
                              <Col xs="12">
                                <b>storageLimit</b>
                                <input
                                  type="text"
                                  className="form-control ink_searchbar-input"
                                  onChange={(e) => {
                                    updateOptions(query.method, 'storageLimit', e.target.value)
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row key={`value-${index}`} className="my-3">
                              <Col xs="12">
                                <b>value</b>
                                <input
                                  type="text"
                                  className="form-control ink_searchbar-input"
                                  onChange={(e) => {
                                    updateOptions(query.method, 'value', e.target.value)
                                  }}
                                />
                              </Col>
                            </Row>
                            {results && (
                              <Row className="my-3">
                                <Col xs="12">
                                  <b>Result</b>
                                </Col>
                              </Row>
                            )}
                            {results &&
                              Object.keys(results[query?.method])
                                .filter((k) => !k.startsWith('_'))
                                .map((result, i) => (
                                  <Row key={i} className="my-3">
                                    <Col xs="12">
                                      <b>
                                        {result}: {results[query.method][result].toString()}
                                      </b>
                                    </Col>
                                  </Row>
                                ))}

                            <Row className="my-3">
                              <Col xs={2}>
                                <button
                                  className="ink-button ink-button_violet mt-3"
                                  onClick={() => send(query?.method)}
                                >
                                  Send
                                </button>
                              </Col>
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  ) : (
                    <>
                      <Row>
                        <Col xs="12" className="my-3">
                          <p> No queries found. Try uploading the metadata for this contract.</p>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Contract)
