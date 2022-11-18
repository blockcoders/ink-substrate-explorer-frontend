import { useRouter } from 'next/dist/client/router'
import Image from 'next/future/image'
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import icon from '../../assets/img/search-icon.svg'
import { useFormatIntl } from '../../hooks/useFormatIntl'

function Searchbar() {
  const { format } = useFormatIntl()
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
    if (search.length > 0 && selectedType !== 'type') {
      if (selectedType !== 'contracts/transactions') {
        router.push({
          pathname: `/${selectedType}/details/${search}`,
        })
      } else {
        router.push({
          pathname: `/${selectedType}/${search}`,
        })
      }
      setSearch('')
    }
  }

  return (
    <>
      <Row>
        <Col>
          <>
            <div className="input-group ink_searchbar">
              <span className="input-group-text ink_searchbar-select p-1">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedType}
                  onChange={change}
                >
                  <option value={'type'}>{format('search_by')}</option>
                  <option value="transaction">{format('transaction_hash')}</option>
                  <option value="block">{format('block_hash')}</option>
                  <option value="contracts/transactions">{format('contract_address')}</option>
                </select>
              </span>
              <input
                type="text"
                className="form-control ink_searchbar-input"
                placeholder={format('search_placeholder')}
                onKeyPress={handleKeyPress}
                value={search}
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
