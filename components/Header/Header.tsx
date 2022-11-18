import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useFormatIntl } from '../../hooks/useFormatIntl'
import { getTitle } from '../../utils/pagetitile'
import InfoCard from '../InfoCard/InfoCard'
import Searchbar from '../SearchBar/SearchBar'

export const Header = () => {
  const { format } = useFormatIntl()
  const [title, setTitle] = useState('')
  const router = useRouter()
  useEffect(() => {
    const value: string = getTitle(router.pathname)
    setTitle(value)
  }, [router])

  return (
    <>
      <div className="">
        <Searchbar />
      </div>
      <Col xs="12">
        <Row>
          <Col className="d-flex align-items-center">
            <h1 className="ink_maincontainer-title">{title.toLowerCase() ? format(title.toLowerCase()) : ''}</h1>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <InfoCard />
            </div>
          </Col>
        </Row>
      </Col>
    </>
  )
}
