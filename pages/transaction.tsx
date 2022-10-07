import type { NextPage } from 'next'
import Link from 'next/link'
import { Row, Col, Table } from 'react-bootstrap'

const Transaction: NextPage = () => {
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href="/">
            <button className="ink-button ink-button_violetligth">Blocks</button>
          </Link>
        </Col>
        <Col>
          <Link href="/transaction">
            <button className="ink-button ink-button_violet">Transaction</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Method</th>
                <th>Block</th>
                <th>Age</th>
                <th>From</th>
                <th>to</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="black">0xcf903a6fa6da</td>
                <td>transferKeepAlive</td>
                <td className="black">#11,230,314</td>
                <td>5 secs ago</td>
                <td className="black">1rk13zKThodKL</td>
                <td className="black"> 148fP7zCq1JEr</td>
                <td>32.756070 DOT</td>
                <td>0.015600 DOT</td>
              </tr>
              <tr>
                <td className="black">0xcf903a6fa6da</td>
                <td>transferKeepAlive</td>
                <td className="black">#11,230,314</td>
                <td>5 secs ago</td>
                <td className="black">1rk13zKThodKL</td>
                <td className="black"> 148fP7zCq1JEr</td>
                <td>32.756070 DOT</td>
                <td>0.015600 DOT</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default Transaction
