import type { NextPage } from 'next'
import { Row, Container, Col, Table } from "react-bootstrap";


const Home: NextPage = () => {
  return (
    <>
      <Row className='mb-5'>
        <Col>
          <button className='ink-button ink-button_violet'>
            Blocks
          </button>
        </Col>
        <Col>
          <button className='ink-button ink-button_violetligth'>
            Transaction
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive className='ink_table'>
            <thead>
              <tr>
                <th>Block number</th>
                <th>Block Height</th>
                <th>Time</th>
                <th>Mine by</th>
                <th>Transactions</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='black'>#15167764</td>
                <td>15167764</td>
                <td>Jul-18-2022 04:38:07 PM +UTC</td>
                <td className='black'>0xea674fdde714fd979de3edf0f56aa9716b898ec8 </td>
                <td>4</td>
                <td>540 bytes</td>
              </tr>
              <tr>
                <td className='black'>#15167764</td>
                <td>15167764</td>
                <td>Jul-18-2022 04:38:07 PM +UTC</td>
                <td className='black'>0xea674fdde714fd979de3edf0f56aa9716b898ec8 </td>
                <td>4</td>
                <td>540 bytes</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default Home
