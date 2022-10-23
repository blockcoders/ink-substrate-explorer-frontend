import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import InfoCard from '../components/InfoCard/InfoCard'
import SearchBar from '../components/SearchBar/SearchBar'
import Sidebar from '../components/Sidebar/Sidebar'
import { getTitle } from '../utils/pagetitile'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [title, setTitle] = useState('')
  const router = useRouter()
  useEffect(() => {
    const value: string = getTitle(router.pathname)
    setTitle(value)
  }, [router])
  return (
    <>
      <Head>
        <title>Ink</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="wrapper">
        <div className="ink_sidebar">
          <Sidebar />
        </div>
        <div className="content-page">
          <div className="ink_maincontainer">
            <Row>
              <Container>
                <div className="">
                  <SearchBar />
                </div>
                <Col xs="12">
                  <Row>
                    <Col className="d-flex align-items-center">
                      <h1 className="ink_maincontainer-title">{title}</h1>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-end">
                        <InfoCard />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <div className="content-page_inside">
                  <Component {...pageProps} />
                </div>
              </Container>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyApp
