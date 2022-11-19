import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Dropdown, DropdownButton, InputGroup, Row } from 'react-bootstrap'
import LanguageIcon from '../../assets/img/language.svg'
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
      <div className="mb-2 d-flex justify-content-between">
        <Searchbar />
        <InputGroup className="w-auto">
          <DropdownButton
            variant="outline-secondary"
            title={<Image src={LanguageIcon} alt="language icon" width={20} height={20} />}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item>
              <Link href={router.asPath} locale="en">
                {format('english')}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href={router.asPath} locale="es">
                {format('spanish')}
              </Link>
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
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
