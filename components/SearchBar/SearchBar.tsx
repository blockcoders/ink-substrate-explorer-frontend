import * as React from 'react';
import Image from 'next/future/image'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from "react-bootstrap";
import icon from '../../assets/img/search-icon.svg'

function Searchbar() {
    return (
        <>
            <Row>
                <Col>
                    <InputGroup className="mb-3 ink_searchbar">
                        <InputGroup.Text className='ink_searchbar-icon' id="search"><Image src={icon} alt="Icon"/> </InputGroup.Text>
                        <Form.Control
                            placeholder="Search by Address, Tx Hast, Block"
                            aria-label="search"
                            aria-describedby="search"
                            className='ink_searchbar-input'
                        />
                    </InputGroup>
                </Col>

            </Row>
        </>
    );
}

export default Searchbar;