import { getDataFromTree } from '@apollo/client/react/ssr'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Row, Col, Table } from 'react-bootstrap'
import { GetBlocksQuery, useGetBlocksQuery } from '../generated'
import withApollo from '../lib/withApollo'

const Home: NextPage = () => {
  const { data } = useGetBlocksQuery({ variables: { skip: 10, take: 10 } })
  const blocks = get(data, 'getBlocks', []) as GetBlocksQuery['getBlocks']

  console.log(blocks.length)
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href="/">
            <button className="ink-button ink-button_violet">Blocks</button>
          </Link>
        </Col>
        <Col>
          <Link href="/transaction">
            <button className="ink-button ink-button_violetligth">Transaction</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover className="ink_table">
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
                <td className="black">#15167764</td>
                <td>15167764</td>
                <td>Jul-18-2022 04:38:07 PM +UTC</td>
                <td className="black">
                  <Link href="/transaction/details/0xff8e6fb9752f34afc2f57816062530f21d000c231ffdc9f29f8e9853deaffb88">
                    0xea674fdde714fd979de3edf0f56aa9716b898ec8
                  </Link>
                </td>
                <td>4</td>
                <td>540 bytes</td>
              </tr>
              <tr>
                <td className="black">#15167764</td>
                <td>15167764</td>
                <td>Jul-18-2022 04:38:07 PM +UTC</td>
                <td className="black">
                  <Link href="/transaction/details/0xff8e6fb9752f34afc2f57816062530f21d000c231ffdc9f29f8e9853deaffb88">
                    0xea674fdde714fd979de3edf0f56aa9716b898ec8
                  </Link>
                </td>
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

export default withApollo(Home, { getDataFromTree })
