import hljs from 'highlight.js'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Row, Col, Table, Tab, Tabs } from 'react-bootstrap'
import 'highlight.js/styles/github.css'
import Accordion from 'react-bootstrap/Accordion'
import verifed from '../../assets/img/verifed.svg'

const Transaction: NextPage = () => {
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href="/token">
            <button className="ink-button ink-button_violetligth">Transactions</button>
          </Link>
        </Col>
        <Col>
          <Link href="/token/contracts">
            <button className="ink-button ink-button_violet">Contracts</button>
          </Link>
        </Col>
        <Col>
          <Link href="/token/events">
            <button className="ink-button ink-button_violetligth">Events</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs className="mb-3 ink-tab" defaultActiveKey="Code">
            <Tab className="ink-tab_button" eventKey="Code" title="Code">
              <Row>
                <Col className="my-3" xs={12}>
                  <Image src={verifed} alt="Icon" /> <b> Contract Source Code Verified</b> <span>(Exact Match)</span>
                </Col>
                <Col xs={12} className="my-3">
                  <Table className="ink-tab_table">
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td>Dai</td>
                        <td>Substrate Version</td>
                        <td>0.10.x</td>
                      </tr>
                      <tr>
                        <td>Optimization Enabled</td>
                        <td>True/False</td>
                        <td>Other Settings</td>
                        <td> default evmVersion, GNU GPLv3 license</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Row>
                    <Col>
                      <b>Contract Source Code</b> (Solidity)
                    </Col>
                  </Row>
                </Col>
                <Col xs="12"></Col>
                <Col xs="12" className="my-5">
                  <pre>
                    <code>
                      {` 
                      *Submitted for verification at Etherscan.io on 2019-11-14
                      */

                      // hevm: flattened sources of /nix/store/8xb41r4qd0cjb63wcrxf1qmfg88p0961-dss-6fd7de0/src/dai.sol
                      pragma solidity =0.5.12;

                      ////// /nix/store/8xb41r4qd0cjb63wcrxf1qmfg88p0961-dss-6fd7de0/src/lib.sol
                      // This program is free software: you can redistribute it and/or modify
                      // it under the terms of the GNU General Public License as published by
                      // the Free Software Foundation, either version 3 of the License, or
                      // (at your option) any later version.

                      // This program is distributed in the hope that it will be useful,
                      // but WITHOUT ANY WARRANTY; without even the implied warranty of
                      // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                      // GNU General Public License for more details.

                      // You should have received a copy of the GNU General Public License
                      // along with this program.  If not, see <http://www.gnu.org/licenses/>.
                          modifier note {}`}
                    </code>
                  </pre>
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="Read" title="Read">
              <Row>
                <Col className="my-5">
                  <Accordion className="ink-accordion" defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0" className="ink-accordion_item">
                      <Accordion.Header>1.Domain_separator</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="ink-accordion_item">
                      <Accordion.Header>2.Permit_typehash</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="ink-accordion_item">
                      <Accordion.Header>3. Allowance</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="Write" title="Write">
              <Accordion className="ink-accordion" defaultActiveKey={['0']}>
                <Accordion.Item eventKey="0" className="ink-accordion_item">
                  <Accordion.Header>Approve</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="ink-accordion_item">
                  <Accordion.Header>2.Burn</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="ink-accordion_item">
                  <Accordion.Header>3. Deny</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default Transaction
