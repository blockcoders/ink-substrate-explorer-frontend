import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import sortIcon from '../assets/img/sort.svg'
import { Loading } from '../components/Loading/Loading'
import { GetBlocksQuery, useGetBlocksQuery } from '../generated'
import { useToast } from '../hooks'
import { formatTimeAgo, showShortHash } from '../lib/utils'
import withApollo from '../lib/withApollo'

const Home: NextPage = () => {
  const [pagination, setPagination] = useState({ skip: 0, take: 10, orderByNumber: false, orderAsc: false })
  const { data, loading, error } = useGetBlocksQuery({ variables: pagination })
  const blocks = get(data, 'getBlocks', []) as GetBlocksQuery['getBlocks']

  const { showErrorToast } = useToast()

  const toogleOrderByTimestamp = () => {
    const { skip, take, orderAsc } = pagination
    const newPagination = { skip, take, orderByNumber: false, orderAsc: !orderAsc }
    setPagination(newPagination)
  }

  const toogleOrderByNumber = () => {
    const { skip, take, orderAsc } = pagination
    const newPagination = { skip, take, orderByNumber: true, orderAsc: !orderAsc }
    setPagination(newPagination)
  }
  const nextPage = () => {
    const { skip, take, orderAsc, orderByNumber } = pagination
    if (blocks.length < take) return
    setPagination({ skip: skip + take, take, orderAsc, orderByNumber })
  }

  const previousPage = () => {
    const { skip, take, orderAsc, orderByNumber } = pagination
    const newSkip = skip - take
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take, orderAsc, orderByNumber })
  }

  useEffect(() => {
    if (!!error) showErrorToast(String(error))
  }, [error])

  return (
    <>
      <Row className="mb-5" data-testid="header-links">
        <Col>
          <Link href="/blocks">
            <button className="ink-button ink-button_violet">Blocks</button>
          </Link>
        </Col>
        <Col>
          <Link href="/transactions">
            <button className="ink-button ink-button_violetligth">Transactions</button>
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
                <th onClick={() => toogleOrderByNumber()} role="button" className="d-flex align-center gap-1">
                  <Image src={sortIcon} width={20} height={20} />
                  Number
                </th>
                <th>Hash</th>
                <th onClick={() => toogleOrderByTimestamp()} role="button" className="d-flex align-center gap-1">
                  <Image src={sortIcon} width={20} height={20} />
                  Time
                </th>
                <th>Parent Hash</th>
                <th>Transactions</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody data-testid="tbody">
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
          {loading && <Loading />}
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

export default withApollo(Home)
