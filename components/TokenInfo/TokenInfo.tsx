import Image from 'next/future/image'
import * as React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import profile from '../../assets/img/profile.svg'
import recipent from '../../assets/img/recipent.svg'

function TokenInfo() {
  return (
    <>
      <Row>
        <Col>
          <div className=" ink_infotoogle ink_infotoogle-tokeninfo">
            <Row>
              <Col xs="12">
                <Image src={recipent} alt="Icon" /> <h5 className="d-inline-block">Transaction Receipt Event Logs</h5>
              </Col>
              <Col xs="12" className="mt-3">
                <Table className="ink_infotoogle-tokeninfo_table">
                  <tbody>
                    <tr>
                      <td>Name </td>
                      <td colSpan={3}>Dai</td>
                    </tr>
                    <tr>
                      <td>Creator</td>
                      <td>Maker : Deployer 4</td>
                      <td>Substrate Version</td>
                      <td>0.10.x</td>
                    </tr>
                    <tr>
                      <td>Symbol</td>
                      <td>DAI</td>
                      <td>Optimization Enabled</td>
                      <td>True/False</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </Col>
        <Col>
          <div className=" ink_infotoogle ink_infotoogle-tokeninfo">
            <Row>
              <Col xs="12">
                <Image src={profile} alt="Icon" /> <h5 className="d-inline-block">Profile Summary</h5>
              </Col>
              <Col xs="12" className="mt-3">
                <Table className="ink_infotoogle-tokeninfo_table">
                  <tbody>
                    <tr>
                      <td>Contract </td>
                      <td colSpan={3}>0x6B175474E89094C44Da98b954EedeAC495271d0F</td>
                    </tr>
                    <tr>
                      <td>Decimals</td>
                      <td colSpan={3}>18</td>
                    </tr>
                    <tr>
                      <td>Official Site</td>
                      <td>Text</td>
                      <td>Social</td>
                      <td>Text</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default TokenInfo
