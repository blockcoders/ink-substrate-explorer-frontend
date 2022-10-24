import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { GetBlocksQuery, useGetBlocksQuery } from '../generated'
import { formatTimeAgo, showShortHash } from '../lib/utils'
import withApollo from '../lib/withApollo'

const Home: NextPage = () => {
  const [pagination, setPagination] = useState({ skip: 0, take: 10, orderByNumber: false, orderAsc: false })
  const { data } = useGetBlocksQuery({ variables: pagination })
  const blocks = get(data, 'getBlocks', []) as GetBlocksQuery['getBlocks']

  const toogleOrder = () => {
    const { skip, take, orderByNumber, orderAsc } = pagination
    const newPagination = { skip, take, orderByNumber, orderAsc: !orderAsc }
    setPagination(newPagination)
  }

  const toogleOrderByNumber = () => {
    const { skip, take, orderByNumber, orderAsc } = pagination
    const newPagination = { skip, take, orderByNumber: !orderByNumber, orderAsc }
    setPagination(newPagination)
  }
  const nextPage = () => {
    const { skip, take, orderAsc, orderByNumber } = pagination
    setPagination({ skip: skip + take, take, orderAsc, orderByNumber })
  }

  const previousPage = () => {
    const { skip, take, orderAsc, orderByNumber } = pagination
    const newSkip = skip - take
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take, orderAsc, orderByNumber })
  }

  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href="/blocks">
            <button className="ink-button ink-button_violet">Blocks</button>
          </Link>
        </Col>
        <Col>
          <Link href="/transactions">
            <button className="ink-button ink-button_violetligth">Transaction</button>
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
                <th onClick={() => toogleOrderByNumber()}>Block number</th>
                {/* <---  example de como cambiar entre order by number y timestamp*/}
                <th>Block Hash</th>
                <th onClick={() => toogleOrder()}>Time</th>
                {/* <---  example de como cambiar entre order ASC y DESC (ambos deberian poder cambiar esto )*/}
                <th>Parent Hash</th>
                <th>Transactions</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.hash}>
                  <td className="black">{block.number}</td>
                  <td className="black">
                    <Link href={'/block/details/' + block.hash}>
                      <a>{block.hash}</a>
                    </Link>
                  </td>
                  <td>{formatTimeAgo(block.timestamp)}</td>
                  <td className="black">
                    <Link href={'/block/details/' + block.parentHash}>
                      <a>{showShortHash(block.parentHash)}</a>
                    </Link>
                  </td>
                  <td>{block?.transactions?.length || 0}</td>
                  <td>{block.encodedLength} bytes</td>
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

export default withApollo(Home)
