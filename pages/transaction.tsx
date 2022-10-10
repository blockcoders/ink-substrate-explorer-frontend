import { getDataFromTree } from '@apollo/client/react/ssr'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Row, Col, Table } from 'react-bootstrap'
import { useGetTransactionsQuery, GetTransactionsQuery } from '../generated'
import withApollo from '../lib/withApollo'

const showShortHash = (hash: string) => {
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`
}

const Transaction: NextPage = () => {
  const { data } = useGetTransactionsQuery({ variables: { skip: 0, take: 10 } })
  const transactions = get(data, 'getTransactions', []) as GetTransactionsQuery['getTransactions']
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
              {transactions.map((transaction) => (
                <tr key={transaction.hash}>
                  <td className="black">{showShortHash(transaction.hash)}</td>
                  <td>{transaction.method}</td>
                  <td className="black">{showShortHash(transaction.blockHash || '')}</td>
                  <td>{new Date(transaction.timestamp).toUTCString()}</td>
                  <td className="black">1rk13zKThodKL</td>
                  <td className="black"> 148fP7zCq1JEr</td>
                  <td>32.756070 DOT</td>
                  <td>0.015600 DOT</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Transaction, { getDataFromTree })
