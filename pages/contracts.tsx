import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { useGetContractsQuery, GetContractsQuery } from '../generated'
import { formatTimeAgo } from '../lib/utils'
import withApollo from '../lib/withApollo'

const Contract: NextPage = () => {
  const [pagination, setPagination] = useState({ skip: 0, take: 10 })
  const { data } = useGetContractsQuery({ variables: pagination })
  const contracts = get(data, 'getContracts', []) as GetContractsQuery['getContracts']

  const nextPage = () => {
    const { skip, take } = pagination
    setPagination({ take, skip: skip + 10 })
  }

  const previousPage = () => {
    const { skip, take } = pagination
    const newSkip = skip - 10
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take })
  }

  const getLastEventTime = (index: number) => {
    const { events } = contracts[index] || {}
    if (events.length > 0) {
      return formatTimeAgo(events[0].timestamp)
    }
    return 'No events'
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
          <Link href="/transactions">
            <button className="ink-button ink-button_violetligth">Transaction</button>
          </Link>
        </Col>
        <Col>
          <Link href="/contracts">
            <button className="ink-button ink-button_violet">Contracts</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Last Event</th>
                <th>Uploaded metadata</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={contract.address}>
                  <td className="black">
                    <Link href={'/contracts/contract/' + contract.address}>{contract.address}</Link>
                  </td>
                  <td className="black">{getLastEventTime(index)}</td>
                  <td className="black">{contract?.hasMetadata ? 'Yes' : 'No'}</td>
                  <td>{contract?.events?.length}</td>
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

export default withApollo(Contract)