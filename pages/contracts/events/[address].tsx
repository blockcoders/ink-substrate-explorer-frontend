import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import sortIcon from '../../../assets/img/sort.svg'
import { Loading } from '../../../components/Loading/Loading'
import { GetEventsQuery, useGetEventsQuery } from '../../../generated'
import { useToast } from '../../../hooks'
import { useFormatIntl } from '../../../hooks/useFormatIntl'
import { formatTimeAgo } from '../../../lib/utils'
import withApollo from '../../../lib/withApollo'

const Events: NextPage = () => {
  const { format } = useFormatIntl()
  const router = useRouter()
  const address = router.query?.address as string
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 5,
    orderAsc: false,
    contract: address,
  })

  const { data, loading, error } = useGetEventsQuery({ variables: pagination })
  const events = get(data, 'getEvents', []) as GetEventsQuery['getEvents']

  const { showErrorToast } = useToast()

  const toogleOrder = () => {
    setPagination({ ...pagination, orderAsc: !pagination.orderAsc })
  }

  const nextPage = () => {
    const { skip, take } = pagination
    if (events.length < take) return
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
            <button className="ink-button ink-button_violetligth">{format('transactions')}</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/contract/' + address}>
            <button className="ink-button ink-button_violetligth">{format('contract')}</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/events/' + address}>
            <button className="ink-button ink-button_violet">{format('events')}</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>{format('header_index')}</th>
                <th>{format('header_section')}</th>
                <th>{format('header_method')}</th>
                <th>{format('header_tx_hash')}</th>
                <th onClick={() => toogleOrder()} role="button" className="d-flex align-center gap-1">
                  <Image src={sortIcon} width={20} height={20} />
                  {format('header_time')}
                </th>
                <th>{format('header_more')}</th>
              </tr>
            </thead>
            <tbody data-testid="tbody">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="black">{event.index}</td>
                  <td>{event.section}</td>
                  <td>{event.method}</td>
                  <td className="black">
                    <Link href={'/transaction/details/' + event.transactionHash}>{event?.transactionHash}</Link>
                  </td>
                  <td>{formatTimeAgo(event.timestamp, router.locale)}</td>
                  <td>
                    <span className="ink-button_showmore">
                      <Link href={`/contracts/events/${address}/${event.id}`}>{format('show_more')}</Link>
                    </span>
                  </td>
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

export default withApollo(Events)
