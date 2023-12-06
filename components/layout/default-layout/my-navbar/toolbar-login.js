import Image from 'next/image'
import Link from 'next/link'
import styles from './toolbar.module.scss'
import { FiLogOut } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import useFirebase from '@/hooks/use-firebase'
import { CartContext } from '@/hooks/use-cart'

export default function Toolbar({ currentRoute }) {
  const { auth, logout } = useContext(AuthContext)
  const { nickname } = auth
  // const [data, setData] = useState({})
  const { logoutFirebase } = useFirebase()
  const { cart } = useContext(CartContext)
 

  return (
    <ul className="navbar-nav pe-2">
      <li className="nav-item">
        <Link
          className="nav-link nav-scroll-chg btn btn-outline-light"
          href="/cart"
          role="button"
        >
          <i className="bi bi-cart-fill"></i>
          {cart.length > 0 ? (
            <div className={styles.navCartNum}>{cart.length}</div>
          ) : null}
          <p className="d-none d-md-inline d-lg-none"> 購物車</p>
        </Link>
      </li>
      <li></li>
      <li className={styles.navbarLogin}>
        <div className={styles.navbarLoginBtnBlock}>
          <div
            className="nav-link nav-link-logout"
            role="button"
            aria-expanded="false"
          >
            <FiLogOut
              onClick={(e) => {
                e.stopPropagation
                e.preventDefault
                logout()
                // firebase logout(注意，並不會登出google帳號)
                logoutFirebase()
              }}
            />
          </div>
          <div className="nav-link-login nav-link-login-slash"></div>
          <Link
            className="nav-link-login-avatar"
            href="/user"
            role="button"
            aria-expanded="false"
          >
            <img src="/images/user/user-avatar.jpg" alt="" />
          </Link>
          <span className="nav-link-login-avatar-name">{nickname}</span>
        </div>
        <img
          className={styles.navbarLoginImg}
          src="../../../images/navbar/btn-login.svg"
          alt=""
        />

        {/* <i className="bi bi-person-circle"></i> */}
        {/* <p className="d-none d-md-inline d-lg-none">會員中心</p> */}

        {/* <ul
          className={`dropdown-menu dropdown-menu-end p-4 mw-100 ${styles['slideIn']} ${styles['dropdown-menu']}`}
        >
          <li>
            <p className="text-center">
              <Image
                src="/avatar.jpg"
                className="rounded-circle d-block mx-auto"
                alt="..."
                width={80}
                height={80}
              />
            </p>
            <p className="text-center">
              會員姓名: 優拉
              <br />
              帳號: eula123
            </p>
          </li>
          <li>
            <Link className="dropdown-item text-center" href="/admin">
              會員管理區
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item text-center " href="/about">
              客服中心
            </Link>
          </li>
        </ul> */}
      </li>
    </ul>
  )
}
