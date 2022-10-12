import type { NextPage } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import verifed from '../../../assets/img/arrow.svg'

const Transaction: NextPage = () => {
  const router = useRouter()
  const { hash } = router.query
  const [open, setOpen] = useState(false)
  //const [text, setText] = useState(false)
  const [view, setView] = useState('Overview')

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
                    <td className="black">Method</td>
                    <td>TransferKeepAlive</td>
                  </tr>
                  <tr>
                    <td className="black">Block</td>
                    <td>#11,230,314</td>
                  </tr>
                  <tr>
                    <td className="black">Timestamp</td>
                    <td>16 mins ago (Aug-08-2022 10:25:29 PM +UTC)</td>
                  </tr>
                  <tr>
                    <td className="black">Transaction action:</td>
                    <td>Swap 3,315.160448 USDC For 3,315.5040207689524 DAI</td>
                  </tr>
                  <tr>
                    <td className="black">From</td>
                    <td>0xff8e6fb9752f34afc2f57816062530f21d000c231ffdc9f29f8e9853deaffb88</td>
                  </tr>
                  <tr>
                    <td className="black">To</td>
                    <td>0xff8e6fb9752f34afc2f57816062530f21d000c231ffdc9f29f8e9853deaffb88</td>
                  </tr>
                  <tr>
                    <td className="black">Tokens transfered</td>
                    <td>0xff8e6fb9752f34afc2f57816062530f21d000c231ffdc9f29f8e9853deaffb88</td>
                  </tr>
                  <tr>
                    <td className="black">Amount</td>
                    <td>32.756070 DOT</td>
                  </tr>
                  <tr>
                    <td className="black">Ether Price</td>
                    <td>0.015600 DOT</td>
                  </tr>
                  {open && (
                    <>
                      <tr>
                        <td className="black">Gas Limit & Usage by Txn</td>
                        <td>486,226 | 319,492 (65.71%)</td>
                      </tr>
                      <tr>
                        <td className="black">Burnt & Txn Savings Fees</td>
                        <td>
                          🔥 Burnt: 0.003942155161876904 Ether ($6.56) 💸 Txn Savings: 0.004219543660102088 Ether
                          ($7.03)
                        </td>
                      </tr>
                      <tr>
                        <td className="black">Others</td>
                        <td>Txn Type: 2 (EIP-1559) Nonce: 61 Position: 129</td>
                      </tr>
                      <tr>
                        <td className="black">Input Data</td>
                        <td>
                          <textarea className="form-control" rows={3}>
                            Function: mint(uint64 quantity) *** MethodID: 0xfb9d09c8 [0]:
                            0000000000000000000000000000000000000000000000000000000000000002
                          </textarea>
                        </td>
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

export default Transaction
