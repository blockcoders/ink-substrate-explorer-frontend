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
import { useFormatIntl } from '../../../hooks/useFormatIntl'
import { formatTimeAgo } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Transaction: NextPage = () => {
  const { format } = useFormatIntl()
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
            {format('overview')}
          </Button>
          <Button
            variant="primary"
            className={
              'transaction-tabs_buttons transaction-tabs_buttons-btn ' +
              (view === 'Logs' ? 'transaction-tabs_buttons-btn_active' : '')
            }
            onClick={() => setView('Logs')}
          >
            {format('logs')}
          </Button>
        </Col>
      </Row>
      {view === 'Overview' && (
        <>
          <Row>
            <Col className="mb-4 d-flex align-items-center gap-2">
              <BackButton />
              <h4>
                <b>{format('summary')}</b>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table className="ink_table">
                <tbody data-testid="tbody">
                  <tr>
                    <td className="black">{format('header_tx_hash')}</td>
                    <td>{hash}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_block')}</td>
                    <td>{transaction.blockHash}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_timestamp')}</td>
                    <td>{formatTimeAgo(transaction.timestamp, router.locale)}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_section')}</td>
                    <td>{transaction.section}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_method')}</td>
                    <td>{transaction.method}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_signer')}</td>
                    <td>{transaction.signer}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_signature')}</td>
                    <td>{transaction.signature}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_nonce')}</td>
                    <td>{transaction.nonce}</td>
                  </tr>
                  <tr>
                    <td className="black">{format('header_encoded_length')}</td>
                    <td>{transaction.encodedLength} bytes</td>
                  </tr>
                  {open && (
                    <>
                      <tr>
                        <td className="black">{format('header_tip')}</td>
                        <td>{transaction.tip}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_era')}</td>
                        <td>{transaction.era}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_args')}</td>
                        <td>{transaction.args}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_callindex')}</td>
                        <td>{transaction.callIndex}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_decimals')}</td>
                        <td>{transaction.decimals}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_ss58')}</td>
                        <td>{transaction.ss58}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_tokens')}</td>
                        <td>{transaction.tokens}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_type')}</td>
                        <td>{transaction.type}</td>
                      </tr>
                      <tr>
                        <td className="black">{format('header_version')}</td>
                        <td>{transaction.version}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Button onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? format('show_less') : format('show_more')}
          </Button>
        </>
      )}
      {view === 'Logs' && (
        <>
          <Row>
            <Col className="mb-4 d-flex align-items-center gap-2">
              <BackButton />
              <h4>
                <b>{format('transaction_receipt_event_logs')}</b>
              </h4>
            </Col>
          </Row>
          {loading && <Loading />}

          {!loading && transaction?.events?.length === 0 && (
            <p className="py-2 text-center">{format('no_logs_to_show')}</p>
          )}

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
                      <td className="black">{format('header_tx_hash')}</td>
                      <td>{event.transactionHash}</td>
                    </tr>
                    <tr>
                      <td className="black">{format('header_timestamp')}:</td>
                      <td>{formatTimeAgo(event.timestamp, router.locale)}</td>
                    </tr>
                    <tr>
                      <td className="black">{format('header_method')}:</td>
                      <td>{event.method}</td>
                    </tr>
                    <tr>
                      <td className="black">{format('header_section')}:</td>
                      <td>{event.section}</td>
                    </tr>
                    <tr>
                      <td className="black">{format('header_topics')}:</td>
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
                      <td className="black">{format('header_data')}:</td>
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
