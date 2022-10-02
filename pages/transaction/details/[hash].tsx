import { useState } from 'react';
import type { NextPage } from 'next'
import { Row, Collapse, Col, Table, Button } from "react-bootstrap";
import { useRouter } from "next/router";


const Transaction: NextPage = () => {

  const router = useRouter()
  const { hash } = router.query
  const [open, setOpen] = useState(false);


  return (
    <>
      <Row>
        <Col className='mb-4'>
          <h4>Sumarry</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className='ink_table'>
            <tbody>
              <tr>
                <td className='black'>Tx Hash</td>
                <td>{hash}</td>
              </tr>
              {
                open &&
                <>
                  <tr>
                    <td className='black'>Tx Hash</td>
                    <td>{hash}</td>
                  </tr>
                </>
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >Click to see More</Button>
    </>
  )
}

export default Transaction
