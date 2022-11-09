import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import verifed from '../../../assets/img/arrow.svg'
import { BackButton } from '../../../components/BackButton/BackButton'
import { Loading } from '../../../components/Loading/Loading'
import { useGetTransactionQuery, GetTransactionQuery } from '../../../generated'
import { useToast } from '../../../hooks'
import { formatTimeAgo } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Transaction: NextPage = () => {
  const router = useRouter()
  const hash = router.query?.hash as string
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('Overview')

  const { showErrorToast } = useToast()

  const { data, loading, error } = useGetTransactionQuery({ variables: { hash } })
  const transaction = get(data, 'getTransaction', []) as GetTransactionQuery['getTransaction']

  useEffect(() => {
    if (!!error) showErrorToast(String(error))
  }, [error])

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-end transaction-tabs">
          <Button
            variant="primary"
            className={
              'transaction-tabs_buttons transaction-tabs_buttons-btn ' +
              (view === 'Overview' ? 'transaction-tabs_buttons-btn_active' : '')
            }
            onClick={() => setView('Overview')}
          >
            Overview
          </Button>
          <Button
            variant="primary"
            className={
              'transaction-tabs_buttons transaction-tabs_buttons-btn ' +
              (view === 'Logs' ? 'transaction-tabs_buttons-btn_active' : '')
            }
            onClick={() => setView('Logs')}
          >
            Logs
          </Button>
        </Col>
      </Row>
      {view === 'Overview' && (
        <>
          <Row>
            <Col className="mb-4 d-flex align-items-center gap-2">
              <BackButton />
              <h4>
                <b>Summary</b>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table className="ink_table">
                <tbody data-testid="tbody">
                  <tr>
                    <td className="black">Tx Hash</td>
                    <td>{hash}</td>
                  </tr>
                  <tr>
                    <td className="black">Block</td>
                    <td>{transaction.blockHash}</td>
                  </tr>
                  <tr>
                    <td className="black">Timestamp</td>
                    <td>{formatTimeAgo(transaction.timestamp)}</td>
                  </tr>
                  <tr>
                    <td className="black">Section</td>
                    <td>{transaction.section}</td>
                  </tr>
                  <tr>
                    <td className="black">Method</td>
                    <td>{transaction.method}</td>
                  </tr>
                  <tr>
                    <td className="black">Signer</td>
                    <td>{transaction.signer}</td>
                  </tr>
                  <tr>
                    <td className="black">Signature</td>
                    <td>{transaction.signature}</td>
                  </tr>
                  <tr>
                    <td className="black">Nonce</td>
                    <td>{transaction.nonce}</td>
                  </tr>
                  <tr>
                    <td className="black">Encoded Length</td>
                    <td>{transaction.encodedLength} bytes</td>
                  </tr>
                  {open && (
                    <>
                      <tr>
                        <td className="black">Tip</td>
                        <td>{transaction.tip}</td>
                      </tr>
                      <tr>
                        <td className="black">Era</td>
                        <td>{transaction.era}</td>
                      </tr>
                      <tr>
                        <td className="black">Args</td>
                        <td>{transaction.args}</td>
                      </tr>
                      <tr>
                        <td className="black">callIndex</td>
                        <td>{transaction.callIndex}</td>
                      </tr>
                      <tr>
                        <td className="black">Decimals</td>
                        <td>{transaction.decimals}</td>
                      </tr>
                      <tr>
                        <td className="black">ss58</td>
                        <td>{transaction.ss58}</td>
                      </tr>
                      <tr>
                        <td className="black">Tokens</td>
                        <td>{transaction.tokens}</td>
                      </tr>
                      <tr>
                        <td className="black">Type</td>
                        <td>{transaction.type}</td>
                      </tr>
                      <tr>
                        <td className="black">Version</td>
                        <td>{transaction.version}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Button onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Show less' : 'Show more'}
          </Button>
        </>
      )}
      {view === 'Logs' && (
        <>
          <Row>
            <Col className="mb-4 d-flex align-items-center gap-2">
              <BackButton />
              <h4>
                <b>Transaction Receipt Event Logs</b>
              </h4>
            </Col>
          </Row>
          {loading && <Loading />}

          {!loading && transaction?.events?.length === 0 && <p className="text-center py-2">No Logs to show</p>}

          {transaction?.events?.map((event, index) => (
            <Row key={index.toString()}>
              <Col>
                <Table className="ink_table">
                  <tbody>
                    <tr className="ink_table-row-wrapper">
                      <td>
                        <span className="ink_table-number">{event.index}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Transaction Hash</td>
                      <td>{event.transactionHash}</td>
                    </tr>
                    <tr>
                      <td className="black">Time:</td>
                      <td>{formatTimeAgo(event.timestamp)}</td>
                    </tr>
                    <tr>
                      <td className="black">Method:</td>
                      <td>{event.method}</td>
                    </tr>
                    <tr>
                      <td className="black">Section:</td>
                      <td>{event.section}</td>
                    </tr>
                    <tr>
                      <td className="black">Topics:</td>
                      <td>
                        <div className="transactions-logs">
                          {event.topics
                            .slice(1, -1)
                            .split(',')
                            .map((topic: any, index: number) => (
                              <div key={index.toString()} className="transactions-logs-row">
                                <div className="transactions-logs-number">{index}</div>
                                <div className="transactions-logs-arrow">
                                  <Image src={verifed} alt="Icon" />
                                </div>
                                <div className="transactions-logs-hash">{topic}</div>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Data:</td>
                      <td>{event.data}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          ))}
        </>
      )}
    </>
  )
}

export default withApollo(Transaction)
