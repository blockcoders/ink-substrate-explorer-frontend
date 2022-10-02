import * as React from 'react';
import { Row, Container, Col } from "react-bootstrap";
import Image from 'next/future/image'
import recipent from '../../assets/img/recipent.svg'
import profile from '../../assets/img/profile.svg'

function TokenInfo() {
    return (
        <>
            <Row>
                <Col>
                    <div className=' ink_infotoogle ink_infotoogle-tokeninfo'>
                        <Col xs="12">
                            <Image src={recipent} alt="Icon" /> <h5 className='d-inline-block'>Transaction Receipt Event Logs</h5>
                        </Col>
                    </div>
                </Col>
                <Col>
                <div className=' ink_infotoogle ink_infotoogle-tokeninfo'>
                        <Col xs="12">
                            <Image src={profile} alt="Icon" /> <h5 className='d-inline-block'>Profile Summary</h5>
                        </Col>

                    </div>
                </Col>
            </Row>
        </>
    );
}

export default TokenInfo;