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
      storageLimit: undefined,
      value: undefined,
    },
    sender: '',
  }
  return {
    address,
    method,
    args,
  }
}

const Contract: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string

  const { data } = useGetContractQueriesQuery({ variables: { address } })
  const contract = get(data, 'getContractQueries', []) as GetContractQueriesQuery['getContractQueries']
  const [abi, setAbi] = useState('')
  const [parameters, setParameters] = useState([getEmptyQuery()])
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

  const sendTransaction = async (index: number) => {
    try {
      const { data } = await executeQueryMutation({ variables: parameters[index] })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadAbi = async () => {
    try {
      await uploadMetadataMutation({ variables: { contractAddress: address, metadata: abi } })
    } catch (error) {
      console.log(error)
    } finally {
      setAbi('')
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
                    readOnly
                  >
                    {contract?.metadata}
                  </textarea>
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
                    onChange={(e) => setAbi(e.target.value)}
                  ></textarea>
                </Col>
                <Col className="my-3" xs={12}>
                  <button className="ink-button ink-button_violet mt-3" onClick={() => uploadAbi()}>
                    Upload
                  </button>
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="Read" title="Run contract methods">
              <Row>
                <Col className="my-5">
                  {contract?.queries ? (
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
                                      //addValue(e.target.value, getArgName(arg))
                                    }}
                                  />
                                </Col>
                              </Row>
                            ))}
                            <Row className="my-3">
                              <Col xs={2}>
                                <button
                                  className="ink-button ink-button_violet mt-3"
                                  onClick={() => sendTransaction(index)}
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
