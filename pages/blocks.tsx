import { getDataFromTree } from '@apollo/client/react/ssr'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { GetBlocksQuery, useGetBlocksQuery } from '../generated'
import withApollo from '../lib/withApollo'

const Home: NextPage = () => {
  const [pagination, setPagination] = useState({ skip: 0, take: 10 })
  const { data } = useGetBlocksQuery({ variables: pagination })
  const blocks = get(data, 'getBlocks', []) as GetBlocksQuery['getBlocks']

  const nextPage = () => {
    const { skip, take } = pagination
    setPagination({ skip: skip + 10, take })
  }

  const previousPage = () => {
    const { skip, take } = pagination
    const newSkip = skip - 10
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take })
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
          <Link href="/transaction">
            <button className="ink-button ink-button_violetligth">Transaction</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>Block number</th>
                <th>Block Height</th>
                <th>Time</th>
                <th>Mine by</th>
                <th>Transactions</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.hash}>
                  <td className="black">#{block.number}</td>
                  <td>{block.number}</td>
                  <td>{new Date(block.timestamp).toUTCString()}</td>
                  <td className="black">
                    <Link href="/transaction/details/0xff8e6fb9752f34afc2f57816062530f21d000c231ffdc9f29f8e9853deaffb88">
                      0xea674fdde714fd979de3edf0f56aa9716b898ec8
                    </Link>
                  </td>
                  <td>{block?.transactions?.length || 0}</td>
                  <td>540 bytes</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs="12" className="d-flex justify-content-center my-4">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Next onClick={() => nextPage()} />
            <Pagination.Last />
          </Pagination>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Home, { getDataFromTree })
