import Link from 'next/link'
import { Logo } from '../icons/logo'
import { Image } from 'react-bootstrap'

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Logo />
          </div>

          <ul className="navbar-list">
            <li>
              <Image className="d-flex nav-icon-pow" src="iconPow.svg" alt="" />
              <Link href="#" className="list-item" />
              認養伴旅
            </li>
            <li>
              <Link href="#" className="list-item" />
              醫療指南
            </li>
            <li>
              <Link href="#" className="list-item" />
              毛毛論壇
            </li>
            <li>
              <Link href="#" className="list-item" />
              伴侶商鋪
            </li>
            <li style={{ borderRight: '2px solid #584438' }}>
              <Link href="#" className="list-item" />
              火化告別
            </li>
            <li>
              <Link href="#" className="list-item" />
              <Image src="btnLogin.svg" alt="" />
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
