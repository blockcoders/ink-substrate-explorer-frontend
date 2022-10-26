import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { BackButton } from '../../../components/BackButton/BackButton'
import {
  useGetBlockQuery,
  GetBlockQuery,
  GetTransactionsByBlockQuery,
  useGetTransactionsByBlockQuery,
} from '../../../generated'
import { formatTimeAgo, showShortHash } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Block: NextPage = () => {
  const router = useRouter()
  const hash = router.query?.hash as string
  const { data } = useGetBlockQuery({ variables: { hash } })
  const block = get(data, 'getBlock', []) as GetBlockQuery['getBlock']

  const [pagination, setPagination] = useState({ skip: 0, take: 5, orderAsc: false, blockHash: block.hash || hash })
  const { data: txData } = useGetTransactionsByBlockQuery({ variables: pagination })
  const transactions = get(txData, 'getTransactions', []) as GetTransactionsByBlockQuery['getTransactions']

  const toogleOrder = () => {
    setPagination({ ...pagination, orderAsc: !pagination.orderAsc })
  }

  const nextPage = () => {
    const { skip, take } = pagination
    if (transactions.length < take) return
    setPagination({ ...pagination, skip: skip + take })
  }

  const previousPage = () => {
    const { skip, take } = pagination
    const newSkip = skip - take
    setPagination({ ...pagination, skip: newSkip < 0 ? 0 : newSkip })
  }

  return (
    <>
      <Row>
        <Col className="mb-4 d-flex align-items-center">
          <BackButton />
          <h4>
            <b>Summary</b>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="ink_table">
            <tbody data-testid="tbody-block">
              <tr>
                <td className="black">Number</td>
                <td>{block.number}</td>
              </tr>
              <tr>
                <td className="black">Hash</td>
                <td>
                  <Link href={'/block/details/' + block.hash}>
                    <a>{block.hash}</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="black">Timestamp</td>
                <td>{formatTimeAgo(block.timestamp)}</td>
              </tr>
              <tr>
                <td className="black">Parent</td>
                <td>
                  <Link href={'/block/details/' + block.parentHash}>
                    <a>{block.parentHash}</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="black">Size</td>
                <td>{block.encodedLength} bytes</td>
              </tr>
            </tbody>
          </Table>
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
            <tbody data-testid="tbody-tx">
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
                  <td>{transaction.method}</td>
                  <td>{transaction.section}</td>
                  <td className="black">{transaction.signer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        {transactions.length >= 5 && (
          <Col xs="12" className="d-flex justify-content-center my-4">
            <Pagination>
              <Pagination.Prev data-testid="prev-btn" onClick={() => previousPage()} />
              <Pagination.Next data-testid="next-btn" onClick={() => nextPage()} />
            </Pagination>
          </Col>
        )}
      </Row>
    </>
  )
}

export default withApollo(Block)
