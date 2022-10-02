import type { NextPage } from 'next'
import { Row, Container, Col, Table } from "react-bootstrap";
import Link from 'next/link'


const Transaction: NextPage = () => {
  return (
    <>
      <Row className='mb-5'>
        <Col>
          <Link href="/token">
            <button className='ink-button ink-button_violetligth'>
              Transactions
            </button>
          </Link>
        </Col>
        <Col>
          <Link href="/token/contracts">
            <button className='ink-button ink-button_violetligth'>
              Contracts
            </button>
          </Link>
        </Col>
        <Col>
          <Link href="/token/events">
            <button className='ink-button ink-button_violet'>
              Events
            </button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>

        </Col>
      </Row>
    </>
  )
}

export default Transaction
