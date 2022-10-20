import hljs from 'highlight.js'
import { get } from 'lodash'
import type { NextPage } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Row, Col, Table, Tab, Tabs, Button } from 'react-bootstrap'
import 'highlight.js/styles/github.css'
import Accordion from 'react-bootstrap/Accordion'
import verifed from '../../../assets/img/verifed.svg'
import { useGetContractQueriesQuery, GetContractQueriesQuery } from '../../../generated'
import withApollo from '../../../lib/withApollo'

const getArgName = (arg: string) => {
  const { name } = JSON.parse(arg)
  return name
}

const getArgType = (arg: string) => {
  const {
    type: { type },
  } = JSON.parse(arg)
  return type
}

const Contract: NextPage = () => {
  const router = useRouter()
  const address = router.query?.address as string
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  const { data } = useGetContractQueriesQuery({ variables: { address } })
  const contract = get(data, 'getContractQueries', []) as GetContractQueriesQuery['getContractQueries']
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link href={'/contracts/transactions/' + address}>
            <button className="ink-button ink-button_violetligth">Transactions</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/contract/' + address}>
            <button className="ink-button ink-button_violet">Contract</button>
          </Link>
        </Col>
        <Col>
          <Link href={'/contracts/events/' + address}>
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
                  <textarea className="form-control">
                    {` 
                     /**
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
                     
                         modifier note {`}
                  </textarea>
                </Col>
                <Col xs="12">
                  <Row>
                    <Col>
                      <b>Contract ABI</b>
                    </Col>
                  </Row>
                </Col>
                <Col xs="12" className="my-5">
                  <textarea className="form-control">
                    {` 
[{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":`}
                  </textarea>
                </Col>
                <Col xs="12">
                  <Row>
                    <Col>
                      <b>Contract Creation Code</b>
                    </Col>
                  </Row>
                </Col>
                <Col xs="12" className="my-5">
                  <textarea className="form-control">
                    {` 
[{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":`}
                  </textarea>
                </Col>
              </Row>
            </Tab>
            <Tab className="ink-tab_button" eventKey="Read" title="Run contract methods">
              <Row>
                <Col className="my-5">
                  <Accordion className="ink-accordion" defaultActiveKey={['0']}>
                    {contract?.queries?.map((query, index) => (
                      <Accordion.Item key={index} eventKey={`${index}`} className="ink-accordion_item">
                        <Accordion.Header>{query.name}</Accordion.Header>
                        <Accordion.Body>
                          {query.docs}
                          {query.args.map((arg, i) => (
                            <Row key={index + '-' + i} className="my-3">
                              <Col xs="12">
                                <b>{getArgName(arg)}</b>
                                <input
                                  type="text"
                                  className="form-control ink_searchbar-input"
                                  placeholder={getArgType(arg)}
                                />
                              </Col>
                            </Row>
                          ))}
                          <Row className="my-3">
                            <Col xs="2">
                              <Button type="submit" className="ink-button ink-button_primary">
                                Run
                              </Button>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default withApollo(Contract)
