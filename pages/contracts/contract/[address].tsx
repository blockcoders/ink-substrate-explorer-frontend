import 'highlight.js/styles/github.css'
import { Abi } from '@polkadot/api-contract'
import hljs from 'highlight.js'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import verifed from '../../../assets/img/verifed.svg'
import LoadingButton from '../../../components/LoadingButton/LoadingButton'
import { useGetContractQueriesQuery, GetContractQueriesQuery, useUploadMetadataMutation } from '../../../generated'
import { useLoading, useToast } from '../../../hooks'
import { useSendingTx } from '../../../hooks/useSendingTx'
import withApollo from '../../../lib/withApollo'

const WS_PROVIDER = process.env.WS_PROVIDER || 'ws://127.0.0.1:9944'
const DEFAULT_OPTIONS = { gasLimit: '' }

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

const Contract: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  const { isLoading, startLoading, endLoading } = useLoading()
  const { showErrorToast, showLoadingToast, showSuccessToast } = useToast()

  const { data, error, refetch } = useGetContractQueriesQuery({ variables: { address } })
  const contract = get(data, 'getContractQueries', undefined) as GetContractQueriesQuery['getContractQueries']

  const { connect, getContractInstance } = useSendingTx()

  const [options, setOptions] = useState()
  const [showOptions, setShowOptions] = useState(false)
  const [account, setAccount] = useState('')
  const [results, setResults] = useState<any>()
  const [extensionDapp, setExtensionDapp] = useState<any>()
  const [parameters, setParameters] = useState()
  const [base64Abi, setBase64Abi] = useState('')

  useEffect(() => {
    hljs.highlightAll()
  }, [])

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
    const { web3FromAddress, web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
    extensionSetup({ web3FromAddress, web3Accounts, web3Enable })
  }

  useEffect(() => {
    if (!contract) return
    setDefautls()
  }, [contract])

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

  const updateParams = (method: string, arg: string, argType: string, value: string) => {
    let params
    if (!parameters) {
      params = getDefaultParameters()
    } else {
      params = { ...(parameters as any) }
    }
    params[method][arg] = argType === 'Balance' ? Number(value) * 10 ** 12 : value
    setParameters(params)
  }

  const [uploadMetadataMutation] = useUploadMetadataMutation({
    variables: { contractAddress: '', metadata: '' },
  })

  const uploadAbi = async () => {
    startLoading()
    showLoadingToast()
    try {
      await uploadMetadataMutation({ variables: { contractAddress: address, metadata: base64Abi } })
      showSuccessToast('Successful upload')
      setBase64Abi('')
      refetch()
    } catch (error) {
      showErrorToast('Error')
    } finally {
      endLoading()
    }
  }

  const extensionSetup = async (extension: any) => {
    const { web3Accounts, web3Enable, web3FromAddress } = extension
    const extensions = await web3Enable('Ink! Explorer')
    if (extensions?.length === 0) {
      showErrorToast('No extension installed!')
      return
    }
    const accounts = await web3Accounts()
    setAccount(accounts[0].address)
    setExtensionDapp({ web3Accounts, web3Enable, web3FromAddress })
  }

  const send = async (method: string) => {
    if (!parameters) return
    if (!options) return
    if (!results) return
    if (!contract) return
    if (!extensionDapp) return
    try {
      startLoading()
      const api = await connect(WS_PROVIDER)
      const { metadata } = contract || {}
      if (!metadata) {
        throw new Error('Contract metadata not found')
      }
      const abi = new Abi(metadata)
      const { query, tx } = getContractInstance(api, abi, address, method)
      if (!query || !tx) {
        throw new Error('Query/Transaction method not found')
      }
      const values: string[] = Object.values(parameters[method]) || []
      if (query?.meta?.isMutating) {
        const injector = await extensionDapp.web3FromAddress(account)
        try {
          await tx(options[method], ...values).signAndSend(
            account,
            {
              signer: injector?.signer || undefined,
            },
            ({ events, status, txHash, dispatchError, dispatchInfo, internalError }) => {
              const result = {
                status: status.toString(),
                txHash: txHash.toString() || '',
                dispatchError: dispatchError?.toString() || '',
                dispatchInfo: dispatchInfo?.toString() || '',
                internalError: internalError?.toString() || '',
                events: events.map((e) => ` ${e.event.method}`).toString() || '',
              }
              setResults({
                ...results,
                [method]: result,
              })
            },
          )
        } catch (error) {
          console.log('Error: ', error)
        }
      } else {
        const res = await query(account, options[method], ...values)
        const result = {
          debugMessage: res.debugMessage || '',
          gasConsumed: res.gasConsumed?.toString() || '',
          gasRequired: res.gasRequired?.toString() || '',
          output: res.output?.toString() || '',
          result: res.result?.toString() || '',
          storageDeposit: res.storageDeposit?.toString() || '',
        }
        setResults({ ...results, [method]: result })
      }
    } catch (error) {
      showErrorToast(error as any)
      if (results[method]) {
        setResults({ ...results, [method]: {} })
      }
    } finally {
      endLoading()
    }
  }

  const getResult = (result: string, method: string) => {
    if (!results) return ''
    if (!result) return ''
    if (!method) return ''
    const formatted = `${result}: `
    const data = results[method][result]
    let formattedData = data
    switch (result) {
      case 'txHash':
        formattedData = <Link href={`/transaction/details/${data}`}>{`Tx: ${data}`}</Link>
        break
      case 'output':
        let output
        try {
          output = Number(data)
          if (output >= 1_000_000_000_000) {
            output /= 1_000_000_000_000
          } else {
            output = 0
          }
        } catch (error) {
          output = null
        }
        formattedData = JSON.stringify(output)
        break
    }
    return (
      <>
        <b>{formatted}</b>
        {formattedData}
      </>
    )
  }

  useEffect(() => {
    if (!!error) showErrorToast(String(error))
  }, [error])

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
                    value={base64Abi || ''}
                  ></textarea>
                </Col>
                <Col className="my-3" xs={12}>
                  <LoadingButton
                    disabled={isLoading}
                    isLoading={isLoading}
                    className="ink-button ink-button_violet mt-3"
                    onClick={uploadAbi}
                    text="Upload"
                  />
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="Read" title="Run contract methods">
              <Row>
                <Col className="my-5">
                  {contract?.queries && contract?.queries?.length > 0 ? (
                    <Accordion className="ink-accordion" defaultActiveKey={['0']}>
                      {contract?.queries?.map((query, index) => (
                        <Accordion.Item key={index} eventKey={`${index}`} className="ink-accordion_item">
                          <Accordion.Header>{query.name}</Accordion.Header>
                          <Accordion.Body>
                            {query.docs}
                            {query?.args?.length > 0 && (
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
                                    type={getArgType(arg) === 'Balance' ? 'number' : 'text'}
                                    min={0}
                                    className="form-control ink_searchbar-input"
                                    placeholder={getArgType(arg)}
                                    onChange={(e) => {
                                      const { method } = query
                                      const { value } = e.target
                                      updateParams(method, getArgName(arg), getArgType(arg), value)
                                    }}
                                  />
                                </Col>
                              </Row>
                            ))}
                            <Row className="my-3">
                              <Col xs="3">
                                <button
                                  className="ink-button ink-button_small"
                                  onClick={() => setShowOptions(!showOptions)}
                                >
                                  {showOptions ? 'Hide Options' : 'Show Options'}
                                </button>
                              </Col>
                            </Row>
                            {showOptions && (
                              <>
                                <Row key={`gasLimit-${index}`} className="my-3">
                                  <Col xs="12">
                                    <b>gasLimit</b>
                                    <input
                                      type="text"
                                      className="form-control ink_searchbar-input"
                                      placeholder=""
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
                              </>
                            )}

                            {results &&
                              results[query?.method] &&
                              (() => {
                                const resultsToShow = Object.keys(results[query?.method]).filter(
                                  (k) => !k.startsWith('_'),
                                )

                                return (
                                  <>
                                    <Row className="my-3">
                                      <Col xs="12">
                                        <b>Result</b>
                                      </Col>
                                    </Row>

                                    {resultsToShow?.length > 0 && (
                                      <div className="tx-result" data-testid="result-wrapper">
                                        {resultsToShow.map((result, i) => (
                                          <Row key={i} className="my-3">
                                            <Col className="text-break" xs="12">
                                              {getResult(result, query.method)}
                                            </Col>
                                          </Row>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                )
                              })()}

                            <Row className="my-3 d-flex justify-content-end">
                              <Col xs={2}>
                                <LoadingButton
                                  id="send-btn"
                                  disabled={isLoading}
                                  isLoading={isLoading}
                                  className="ink-button ink-button_violet mt-3 send-btn"
                                  onClick={() => send(query?.method)}
                                  text="Send"
                                />
                              </Col>
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  ) : (
                    <>
                      <Row>
                        <Col xs="12" className="my-3 text-center">
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
