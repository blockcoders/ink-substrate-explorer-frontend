import { useEffect } from 'react';
import type { NextPage } from 'next'
import { Row, Container, Col, Table, Tab, Tabs, Nav } from "react-bootstrap";
import Link from 'next/link'
import hljs from 'highlight.js';
import "highlight.js/styles/github.css";


const Transaction: NextPage = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
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
            <button className='ink-button ink-button_violet'>
              Contracts
            </button>
          </Link>
        </Col>
        <Col>
          <Link href="/token/events">
            <button className='ink-button ink-button_violetligth'>
              Events
            </button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs
            className='mb-3 ink-tab'
            defaultActiveKey="Code"
          >
            <Tab className='ink-tab_button' eventKey="Code" title="Code">
            <Row>
        <Col xs="12">
          <Row>
            <Col>
              Contract Source Code (Solidity)
            </Col>
          </Row>
        </Col>
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

    modifier note {}` }

            </code>
          </pre>
        </Col>
      </Row>
            </Tab>
            <Tab className='ink-tab_button' eventKey="Read" title="Read">
              test
            </Tab>
            <Tab className='ink-tab_button' eventKey="Write" title="Write">
              test
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col>
          Contract Source Code Verified
        </Col>
      </Row>
 
    </>
  )
}

export default Transaction
