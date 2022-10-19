import Image from 'next/future/image'
import * as React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import profile from '../../assets/img/profile.svg'
import recipent from '../../assets/img/recipent.svg'

function ContractInfo() {
  return (
    <>
      <Row>
        <Col>
          <div className=" ink_infocard ink_infocard-contractinfo">
            <Row>
              <Col xs="12">
                <Image src={recipent} alt="Icon" /> <h5 className="d-inline-block">Token Summary</h5>
              </Col>
              <Col xs="12" className="mt-3">
                <Table className="ink_infocard-contractinfo_table">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>Dai</td>
                    </tr>
                    <tr>
                      <td>Symbol</td>
                      <td>DAI</td>
                      <td>Creator</td>
                      <td>0x6B175474E89094C44Da98b954EedeAC495271d0F</td>
                    </tr>
                    <tr>
                      <td>Decimals</td>
                      <td>18</td>
                      <td>Contract</td>
                      <td>0x6B175474E89094C44Da98b954EedeAC495271d0F</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </Col>
        <Col>
          <div className=" ink_infocard ink_infocard-contractinfo">
            <Row>
              <Col xs="12">
                <Image src={profile} alt="Icon" /> <h5 className="d-inline-block">Node Information</h5>
              </Col>
              <Col xs="12" className="mt-3">
                <Table className="ink_infocard-contractinfo_table">
                  <tbody>
                    <tr>
                      <td>Optimization Enabled</td>
                      <td>True/False</td>
                    </tr>
                    <tr>
                      <td>Substrate Version</td>
                      <td>0.10.x</td>
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

export default ContractInfo
