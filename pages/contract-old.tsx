import type { NextPage } from 'next'
import { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const Transaction: NextPage = () => {
  const [step, changeStep] = useState(true)
  return (
    <>
      <Row>
        <Col className="mb-4">
          <h4>Transaction Receipt Event Logs</h4>
        </Col>
      </Row>
      <Row>
        {step && (
          <>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Please enter the Contract Address you would like to verify</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Please Select Compiler Type </Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Please Select Compiler Version</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Please Select Open Source License Type</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>
              <Button variant="primary" onClick={() => changeStep(!step)}>
                Next
              </Button>
            </Col>
          </>
        )}
        {!step && (
          <>
            <Col xs="12">
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Address</Form.Label>
                    <Form.Control className="ink-input" type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Compiler</Form.Label>
                    <Form.Control className="ink-input" type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Compiler</Form.Label>
                    <Form.Control className="ink-input" type="text" />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Enter the Solidity Contract Code Below</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Constructor Arguments</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contract Library Adress</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Misc Settings</Form.Label>
                <Form.Control className="ink-input" type="text" />
              </Form.Group>
              <Button variant="primary" onClick={() => changeStep(!step)}>
                Verify and Publish
              </Button>
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default Transaction
