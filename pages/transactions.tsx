import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import sortIcon from '../assets/img/sort.svg'
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
    if (transactions.length < take) return
    setPagination({ skip: skip + take, take, orderAsc })
  }

  const previousPage = () => {
    const { skip, take, orderAsc } = pagination
    const newSkip = skip - take
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take, orderAsc })
  }

  return (
    <>
      <Row className="mb-5" data-testid="header-links">
        <Col>
          <Link href="/blocks">
            <button className="ink-button ink-button_violetligth">Blocks</button>
          </Link>
        </Col>
        <Col>
          <Link href="/transactions">
            <button className="ink-button ink-button_violet">Transactions</button>
          </Link>
        </Col>
        <Col>
          <Link href="/contracts">
            <button className="ink-button ink-button_violetligth">Contracts</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>Hash</th>
                <th>Block Hash</th>
                <th onClick={() => toogleOrder()} role="button" className="d-flex align-center gap-1">
                  <Image src={sortIcon} width={20} height={20} />
                  Time
                </th>
                <th>Section</th>
                <th>Method</th>
                <th>Signer</th>
              </tr>
            </thead>
            <tbody data-testid="tbody">
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
                  <td>{formatTimeAgo(transaction.timestamp)}</td>
                  <td>{transaction.section}</td>
                  <td>{transaction.method}</td>
                  <td className="black">{transaction.signer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs="12" className="d-flex justify-content-center my-4">
          <Pagination>
            <Pagination.Prev data-testid="prev-btn" onClick={() => previousPage()} />
            <Pagination.Next data-testid="next-btn" onClick={() => nextPage()} />
          </Pagination>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Transaction)
