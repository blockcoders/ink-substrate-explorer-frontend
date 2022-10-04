import Image from 'next/future/image'
import Link from 'next/link'
import * as React from 'react'
import { Nav } from 'react-bootstrap'
import blocks from '../../assets/img/blocks.svg'
import logo from '../../assets/img/logo.svg'
import token from '../../assets/img/token.svg'
import transaction from '../../assets/img/transaction.svg'

function Navbar() {
  return (
    <>
      <div>
        <Image src={logo} alt="Logo" className="ink_sidebar-logo" />
        <Nav defaultActiveKey="/" className="flex-column">
          <Link href="/">
            <Nav className="ink_sidebar-item">
              <Image src={blocks} alt="Logo" className="ink_sidebar-icon" /> <span>Blocks</span>
            </Nav>
          </Link>
          <Link href="/transaction">
            <Nav className="ink_sidebar-item">
              <Image src={transaction} alt="Logo" className="ink_sidebar-icon" />
              <span>Transaction</span>
            </Nav>
          </Link>
          <Link href="/token">
            <Nav className="ink_sidebar-item">
              <Image src={token} alt="Logo" className="ink_sidebar-icon" />
              <span>Token</span>
            </Nav>
          </Link>
        </Nav>
      </div>
    </>
  )
}

export default Navbar
