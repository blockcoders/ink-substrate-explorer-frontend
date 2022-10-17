import { getDataFromTree } from '@apollo/client/react/ssr'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import verifed from '../../../assets/img/arrow.svg'
import { useGetTransactionQuery, GetTransactionQuery } from '../../../generated'
import withApollo from '../../../lib/withApollo'

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) {
    return `${interval} years`
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return `${interval} months`
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return `${interval} days`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `${interval} hours`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `${interval} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}

const Transaction: NextPage = () => {
  const router = useRouter()
  const hash = router.query?.hash as string
  const [open, setOpen] = useState(false)
  //const [text, setText] = useState(false)
  const [view, setView] = useState('Overview')

  const { data } = useGetTransactionQuery({ variables: { hash } })
  const transaction = get(data, 'getTransaction', []) as GetTransactionQuery['getTransaction']
  const date = new Date(transaction.timestamp)

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-end transaction-tabs">
          <Button
            variant="primary"
            className="transaction-tabs_buttons transaction-tabs_buttons-overview"
            onClick={() => setView('Overview')}
          >
            Overview
          </Button>
          <Button
            variant="primary"
            className="transaction-tabs_buttons transaction-tabs_buttons-logs"
            onClick={() => setView('Logs')}
          >
            Logs
          </Button>
        </Col>
      </Row>
      {view === 'Overview' && (
        <>
          <Row>
            <Col className="mb-4">
              <h4>
                <b>Summary</b>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table className="ink_table">
                <tbody>
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
                    <td>
                      {formatTimeAgo(date) + ' ago'} ({date.toUTCString()})
                    </td>
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
                    <td>{transaction.encodedLength}</td>
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
            Click to see More
          </Button>
        </>
      )}
      {view === 'Logs' && (
        <>
          <Row>
            <Col className="mb-4">
              <h4>
                <b>Transaction Receipt Event Logs</b>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table className="ink_table">
                <tbody>
                  <span className="ink_table-number">212</span>
                  <tr>
                    <td className="black">Address</td>
                    <td>{hash}</td>
                  </tr>
                  <tr>
                    <td className="black">Name:</td>
                    <td>Transfer (index_topic_1 address from, index_topic_2 address to, uint256 value)</td>
                  </tr>
                  <tr>
                    <td className="black">Topics:</td>
                    <td>
                      <div className="transactions-logs">
                        <div className="transactions-logs-row">
                          <div className="transactions-logs-number">1</div>
                          <div className="transactions-logs-arrow">
                            <Image src={verifed} alt="Icon" />
                          </div>
                          <div className="transactions-logs-hash">
                            0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
                          </div>
                        </div>
                        <div className="transactions-logs-row">
                          <div className="transactions-logs-number">2</div>
                          <div className="transactions-logs-arrow">
                            <Image src={verifed} alt="Icon" />
                          </div>
                          <div className="transactions-logs-hash">
                            0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="black">Data:</td>
                    <td>Value : 3315160448</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default withApollo(Transaction, { getDataFromTree })
