import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { Row, Col, Table } from 'react-bootstrap'
import verifed from '../../../../assets/img/arrow.svg'
import { GetEventQuery, useGetEventQuery } from '../../../../generated'
import { formatTimeAgo } from '../../../../lib/utils'
import withApollo from '../../../../lib/withApollo'

const Event: NextPage = () => {
  const router = useRouter()
  const eventId = router.query?.eventId as string
  const { data } = useGetEventQuery({ variables: { id: eventId } })
  const event = get(data, 'getEvent', []) as GetEventQuery['getEvent']

  return (
    <>
      <>
        <Row>
          <Col className="mb-4">
            <h4>
              <b>Event Log</b>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="ink_table">
              <tbody>
                <span className="ink_table-number">{event.index}</span>
                <tr>
                  <td className="black">Transaction Hash</td>
                  <td>{event.transactionHash}</td>
                </tr>
                <tr>
                  <td className="black">Time:</td>
                  <td>{formatTimeAgo(event.timestamp)}</td>
                </tr>
                <tr>
                  <td className="black">Method:</td>
                  <td>{event.method}</td>
                </tr>
                <tr>
                  <td className="black">Section:</td>
                  <td>{event.section}</td>
                </tr>
                <tr>
                  <td className="black">Topics:</td>
                  <td>
                    <div className="transactions-logs">
                      {event.topics
                        ?.slice(1, -1)
                        .split(',')
                        .map((topic: any, index: number) => (
                          <div className="transactions-logs-row">
                            <div className="transactions-logs-number">{index}</div>
                            <div className="transactions-logs-arrow">
                              <Image src={verifed} alt="Icon" />
                            </div>
                            <div className="transactions-logs-hash">{topic}</div>
                          </div>
                        ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="black">Data:</td>
                  <td>{event.data}</td>
                </tr>
                <tr>
                  <td className="black">Formatted Data:</td>
                  <td>{event.formattedData}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    </>
  )
}

export default withApollo(Event)