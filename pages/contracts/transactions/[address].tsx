import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { useGetTransactionsByContractQuery, GetTransactionsByContractQuery } from '../../../generated'
import { formatTimeAgo, showShortHash } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Transaction: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 5,
    orderAsc: false,
    address: address,
  })
  const { data } = useGetTransactionsByContractQuery({ variables: pagination })
  const transactions = get(
    data,
    'getTransactionsByContract',
    [],
  ) as GetTransactionsByContractQuery['getTransactionsByContract']

  const toogleOrder = () => {
    setPagination({ ...pagination, orderAsc: !pagination.orderAsc })
  }

  const nextPage = () => {
    setPagination({ ...pagination, skip: pagination.skip + 10 })
  }

  const previousPage = () => {
    const newSkip = pagination.skip - 10
    setPagination({ ...pagination, skip: newSkip < 0 ? 0 : newSkip })
  }

  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href={'/contracts/transactions/' + address}>
            <button className="ink-button ink-button_violet">Transactions</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/contract/' + address}>
            <button className="ink-button ink-button_violetligth">Contract</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/events/' + address}>
            <button className="ink-button ink-button_violetligth">Events</button>
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
                <th>Section</th>
                <th>Method</th>
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
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Transaction)
