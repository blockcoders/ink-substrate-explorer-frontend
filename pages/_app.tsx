import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Row, Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import Sidebar from '../components/Sidebar/Sidebar'
import { IntlProvider } from 'react-intl'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'

import { en } from '../i18n/en'
import { es } from '../i18n/es'
import { Header } from '../components/Header/Header'

const messages: any = { en, es }

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()

  return (
    <>
      <Head>
        <title>Ink! Explorer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <IntlProvider locale={locale || 'en'} messages={messages[locale as string]}>
        <div className="wrapper">
          <div className="ink_sidebar">
            <Sidebar />
          </div>
          <div className="content-page">
            <div className="ink_maincontainer">
              <Row>
                <Container>
                  <Header />
                  <div className="content-page_inside">
                    <Component {...pageProps} />
                  </div>
                  <ToastContainer />
                </Container>
              </Row>
            </div>
          </div>
        </div>
      </IntlProvider>
    </>
  )
}

export default MyApp
