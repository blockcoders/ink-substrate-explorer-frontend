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
import {
  useGetContractQueriesQuery,
  GetContractQueriesQuery,
  useUploadMetadataMutation,
  useExecuteQueryMutation,
  QueryArgs,
} from '../../../generated'
import withApollo from '../../../lib/withApollo'

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

const getEmptyQuery = () => {
  const address = ''
  const method = ''
  const args: QueryArgs = {
    options: {
      gasLimit: '',
      storageLimit: '',
      value: '',
    },
    sender: '',
    values: [],
  }
  return {
    address,
    method,
    args,
  }
}

const DEFUALT_OPTIONS = { gasLimit: '200000000000', storageLimit: '', value: '' }

const Contract: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  const sender = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' // TODO: get from wallet

  const { data } = useGetContractQueriesQuery({ variables: { address } })
  const contract = get(data, 'getContractQueries', []) as GetContractQueriesQuery['getContractQueries']

  const [options, setOptions] = useState()
  const [parameters, setParameters] = useState()
  const [base64Abi, setBase64Abi] = useState('')

  const getDefaultOptions = () => {
    const op: any = {}
    contract?.queries?.forEach((query) => {
      const { method } = query
      op[method] = DEFUALT_OPTIONS
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

  const setDefautls = () => {
    setDefaultOptions()
    setDefaultParameters()
  }

  const updateOptions = (method: string, arg: 'gasLimit' | 'storageLimit' | 'value', value: string) => {
    let op
    if (!options) {
      op = getDefaultOptions()
    } else {
      op = { ...(options as any) }
    }
    console.log('UPDATE OPTIONS', op, method, value)
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
    console.log('UPDATE PARAMS', params, method, arg, value)
    params[method][arg] = value
    setParameters(params)
  }
  console.log(parameters)

  useEffect(() => {
    hljs.highlightAll()
  }, [])

  const [uploadMetadataMutation] = useUploadMetadataMutation({
    variables: { contractAddress: '', metadata: '' },
  })

  const [executeQueryMutation] = useExecuteQueryMutation({
    variables: getEmptyQuery(),
  })

  const sendTransaction = async (method: string) => {
    if (!parameters) return
    if (!options) return
    try {
      const query = getEmptyQuery()
      query.address = address
      query.method = method
      query.args.sender = sender
      query.args.values = Object.values(parameters[method])
      query.args.options = options[method]
      console.log('SEND TRANSACTION', query)
      const { data } = await executeQueryMutation({ variables: query })
      console.log(data)
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
                            <Row className="my-3">
                              <Col xs={2}>
                                <button
                                  className="ink-button ink-button_violet mt-3"
                                  onClick={() => sendTransaction(query?.method)}
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
