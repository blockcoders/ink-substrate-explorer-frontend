import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import sortIcon from '../../../assets/img/sort.svg'
import { useGetTransactionsByContractQuery, GetTransactionsByContractQuery } from '../../../generated'
import { useToast } from '../../../hooks'
import { formatTimeAgo, showShortHash } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Transaction: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 5,
    orderAsc: false,
    address,
  })

  useEffect(() => {
    setPagination({ ...pagination, address })
  }, [address])

  const { data, error } = useGetTransactionsByContractQuery({ variables: pagination })
  const transactions = get(
    data,
    'getTransactionsByContract',
    [],
  ) as GetTransactionsByContractQuery['getTransactionsByContract']

  const { showErrorToast } = useToast()

  const toogleOrder = () => {
    setPagination({ ...pagination, orderAsc: !pagination.orderAsc })
  }

  const nextPage = () => {
    const { skip, take } = pagination
    if (transactions.length < take) return
    setPagination({ ...pagination, skip: skip + take })
  }

  const previousPage = () => {
    const newSkip = pagination.skip - pagination.take
    setPagination({ ...pagination, skip: newSkip < 0 ? 0 : newSkip })
  }

  useEffect(() => {
    if (!!error) showErrorToast(String(error))
  }, [error])

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
                  <td>{formatTimeAgo(transaction.timestamp, router.locale)}</td>
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
