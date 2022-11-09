import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import verifed from '../../../../assets/img/arrow.svg'
import { BackButton } from '../../../../components/BackButton/BackButton'
import { Loading } from '../../../../components/Loading/Loading'
import LoadingButton from '../../../../components/LoadingButton/LoadingButton'
import { GetEventQuery, useDecodeEventMutation, useGetEventQuery } from '../../../../generated'
import { useLoading, useToast } from '../../../../hooks'
import { formatTimeAgo } from '../../../../lib/utils'
import withApollo from '../../../../lib/withApollo'
import { formatJsonData } from '../../../../utils/json'

const Event: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  const eventId = router.query?.eventId as string
  const { endLoading, isLoading, startLoading } = useLoading()
  const { showErrorToast } = useToast()
  const { data, loading, error } = useGetEventQuery({ variables: { id: eventId } })
  const event = get(data, 'getEvent', []) as GetEventQuery['getEvent']
  const [eventData, setEventData] = useState<any>({
    identifier: '',
    decodedData: '',
    formattedData: '',
  })

  const [decodeEventMutation] = useDecodeEventMutation({
    variables: { contractAddress: '', id: '' },
  })

  const decode = async () => {
    startLoading()
    try {
      const result = await decodeEventMutation({ variables: { contractAddress: address, id: eventId } })
      const response = JSON.parse(result?.data?.decodeEvent as any)
      setEventData({
        identifier: response?.identifier,
        decodedData: response?.decodedData || {},
        formattedData: response?.formattedData || {},
      })
    } catch (error: any) {
      showErrorToast(error.message || 'error')
    }
    endLoading()
  }
  useEffect(() => {
    setEventData(() => ({
      identifier: event.identifier || '',
      decodedData: event.decodedData ? JSON.parse(event.decodedData) : {},
      formattedData: event.formattedData ? JSON.parse(event.formattedData) : {},
    }))
  }, [event?.decodedData])

  useEffect(() => {
    if (!!error) showErrorToast(String(error))
  }, [error])

  return (
    <>
      <>
        <Row>
          <Col className="mb-4 d-flex align-items-center gap-1" xs="10">
            <BackButton />
            <h4 className="d-flex align-items-center gap-3">
              <b>Event Log</b>
              {loading && <Loading />}
            </h4>
          </Col>
          <Col className="mb-4" xs="2">
            <LoadingButton
              disabled={isLoading}
              isLoading={isLoading}
              className="transaction-tabs_buttons transaction-tabs_buttons-btn transaction-tabs_buttons-btn_active text-rigth"
              text=" Decode Event"
              onClick={decode}
            />
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
                  <td className="black">Identifier:</td>
                  <td>{eventData?.identifier}</td>
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
                          <div key={index.toString()} className="transactions-logs-row">
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
                  <td>
                    <textarea
                      readOnly
                      className="form-control"
                      rows={5}
                      placeholder="Verify that the contract has the metadata uploaded and decode the event"
                      value={formatJsonData(eventData?.formattedData || {})}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td className="black">Decoded Data:</td>
                  <td>
                    <textarea
                      readOnly
                      className="form-control"
                      rows={5}
                      placeholder="Verify that the contract has the metadata uploaded and decode the event"
                      value={formatJsonData(eventData?.decodedData || {})}
                    ></textarea>
                  </td>
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
