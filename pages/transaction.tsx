import { getDataFromTree } from '@apollo/client/react/ssr'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { useGetTransactionsQuery, GetTransactionsQuery } from '../generated'
import { formatTimeAgo, showShortHash } from '../lib/utils'
import withApollo from '../lib/withApollo'

const Transaction: NextPage = () => {
  const [pagination, setPagination] = useState({ skip: 0, take: 10, orderAsc: false })
  const { data } = useGetTransactionsQuery({ variables: pagination })
  const transactions = get(data, 'getTransactions', []) as GetTransactionsQuery['getTransactions']

  const toogleOrder = () => {
    const { skip, take, orderAsc } = pagination
    const newPagination = { skip, take, orderAsc: !orderAsc }
    setPagination(newPagination)
  }

  const nextPage = () => {
    const { skip, take, orderAsc } = pagination
    setPagination({ skip: skip + 10, take, orderAsc })
  }

  const previousPage = () => {
    const { skip, take, orderAsc } = pagination
    const newSkip = skip - 10
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take, orderAsc })
  }

  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href="/blocks">
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
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Block</th>
                <th onClick={() => toogleOrder()}>Time</th>
                <th>Method</th>
                <th>Section</th>
                <th>Signer</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.hash}>
                  <td className="black">
                    <Link href={'/transaction/details/' + transaction.hash}>{showShortHash(transaction.hash)}</Link>
                  </td>
                  <td className="black">
                    <Link href={'/block/details/' + transaction.blockHash}>
                      {showShortHash(transaction.blockHash || '')}
                    </Link>
                  </td>
                  <td>
                    {formatTimeAgo(new Date(transaction.timestamp)) + ' ago'} (
                    {new Date(transaction.timestamp).toUTCString()})
                  </td>
                  <td>{transaction.method}</td>
                  <td>{transaction.section}</td>
                  <td className="black">{transaction.signer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs="12" className="d-flex justify-content-center my-4">
          <Pagination>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Transaction, { getDataFromTree })
