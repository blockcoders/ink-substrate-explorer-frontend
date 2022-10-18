import { useRouter } from 'next/dist/client/router'
import Image from 'next/future/image'
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import icon from '../../assets/img/search-icon.svg'

function Searchbar() {
  const [selectedType, setSelectedType] = useState('type')
  const [search, setSearch] = useState('')
  const router = useRouter()

  const change = (e: any) => {
    setSelectedType(e.target.value)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    search.length > 0 &&
      selectedType !== 'type' &&
      router.push({
        pathname: `/${selectedType}/details/${search}`,
      })
  }

  return (
    <>
      <Row>
        <Col>
          {/* <InputGroup className="mb-3 ink_searchbar">
            <InputGroup.Text className="ink_searchbar-icon" id="search">
              <Image src={icon} alt="Icon" />{' '}
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by Address, Tx Hast, Block"
              aria-label="search"
              aria-describedby="search"
              className="ink_searchbar-input"
            />
          </InputGroup> */}
          <>
            <div className="input-group ink_searchbar">
              <span className="input-group-text ink_searchbar-select p-1">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedType}
                  onChange={change}
                >
                  <option value={'type'}>Search by...</option>
                  <option value="transaction">Transaction Hash</option>
                  <option value="block">Block Hash</option>
                  <option value="contract">Contract Address</option>
                </select>
              </span>
              <input
                type="text"
                className="form-control ink_searchbar-input"
                placeholder="Contract Address, Tx Hash, Block Hash"
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary ink_searchbar-icon"
                type="button"
                id="search"
                onClick={handleSubmit}
              >
                <Image src={icon} alt="Icon" />
              </button>
            </div>
          </>
        </Col>
      </Row>
    </>
  )
}

export default Searchbar
