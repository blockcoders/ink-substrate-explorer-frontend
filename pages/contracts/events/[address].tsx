import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { GetEventsQuery, useGetEventsQuery } from '../../../generated'
import { formatTimeAgo } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Events: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 5,
    orderAsc: false,
    contract: address,
  })

  const { data } = useGetEventsQuery({ variables: pagination })
  const events = get(data, 'getEvents', []) as GetEventsQuery['getEvents']

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
            <button className="ink-button ink-button_violetligth">Transactions</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/contract/' + address}>
            <button className="ink-button ink-button_violetligth">Contract</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/events/' + address}>
            <button className="ink-button ink-button_violet">Events</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Section</th>
                <th>Method</th>
                <th>Transaction Hash</th>
                <th onClick={() => toogleOrder()}>Time</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="black">{event.index}</td>
                  <td>{event.section}</td>
                  <td>{event.method}</td>
                  <td className="black">
                    <Link href={'/transaction/details/' + event.transactionHash}>{event?.transactionHash}</Link>
                  </td>
                  <td>{formatTimeAgo(event.timestamp)}</td>
                  <td>
                    <span className="ink-button_showmore">
                      <Link href={`/contracts/events/${address}/${event.id}`}> Show more</Link>
                    </span>
                  </td>
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

export default withApollo(Events)
