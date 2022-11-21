import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { Loading } from '../components/Loading/Loading'
import { useGetContractsQuery, GetContractsQuery } from '../generated'
import { useToast } from '../hooks'
import { useFormatIntl } from '../hooks/useFormatIntl'
import { formatTimeAgo } from '../lib/utils'
import withApollo from '../lib/withApollo'

const Contract: NextPage = () => {
  const { locale } = useRouter()

  const { format } = useFormatIntl()
  const [pagination, setPagination] = useState({ skip: 0, take: 10 })
  const { data, loading, error } = useGetContractsQuery({ variables: pagination })
  const contracts = get(data, 'getContracts', []) as GetContractsQuery['getContracts']

  const { showErrorToast } = useToast()

  const nextPage = () => {
    const { skip, take } = pagination
    if (contracts.length < take) return
    setPagination({ take, skip: skip + take })
  }

  const previousPage = () => {
    const { skip, take } = pagination
    const newSkip = skip - take
    setPagination({ skip: newSkip < 0 ? 0 : newSkip, take })
  }

  const getLastEventTime = (index: number) => {
    const { events } = contracts[index] || {}
    if (events.length > 0) {
      return formatTimeAgo(events[0].timestamp, locale)
    }
    return 'No events'
  }

  useEffect(() => {
    if (!!error) showErrorToast(String(error))
  }, [error])

  return (
    <>
      <Row className="mb-5" data-testid="header-links">
        <Col>
          <Link href="/blocks">
            <button className="ink-button ink-button_violetligth">{format('blocks')}</button>
          </Link>
        </Col>
        <Col>
          <Link href="/transactions">
            <button className="ink-button ink-button_violetligth">{format('transactions')}</button>
          </Link>
        </Col>
        <Col>
          <Link href="/contracts">
            <button className="ink-button ink-button_violet">{format('contracts')}</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table responsive hover className="ink_table">
            <thead>
              <tr>
                <th>{format('header_address')}</th>
                <th>{format('header_last_event')}</th>
                <th>{format('header_uploaded_metadata')}</th>
                <th>{format('header_events')}</th>
              </tr>
            </thead>
            <tbody data-testid="tbody">
              {contracts.map((contract, index) => (
                <tr key={contract.address}>
                  <td className="black">
                    <Link href={'/contracts/contract/' + contract.address}>{contract.address}</Link>
                  </td>
                  <td className="black">{getLastEventTime(index)}</td>
                  <td className="black">{contract?.hasMetadata ? format('yes') : format('no')}</td>
                  <td>{contract?.events?.length}</td>
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

export default withApollo(Contract)
