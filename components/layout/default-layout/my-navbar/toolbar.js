import Image from 'next/image'
import Link from 'next/link'
import styles from './toolbar.module.scss'
import { useContext } from 'react'
import { CartContext } from '@/hooks/use-cart'

export default function Toolbar({ currentRoute }) {
  const { cart } = useContext(CartContext)
  console.log('cart----------------------')
  console.log(cart)
  return (
    <ul className="navbar-nav pe-2">
      <li className="nav-item ">
        <Link
          className=" nav-link nav-scroll-chg btn btn-outline-light"
          href="/cart"
          role="button"
        >
          <i className="bi bi-cart-fill "></i>
          {cart.length > 0 ? (
            <div className={styles.navCartNum}>{cart.length}</div>
          ) : null}

          <p className="d-none d-md-inline d-lg-none"> 購物車</p>
        </Link>
      </li>

      <li className={styles.navbarLogin}>
        <div className={styles.navbarLoginBtnBlock}>
          <Link
            className="nav-link nav-link-login"
            href="/user/login"
            role="button"
            aria-expanded="false"
          >
            登入
          </Link>
          <div className="nav-link nav-link-login nav-link-login-slash"> /</div>
          <Link
            className="nav-link nav-link-login"
            href="/user/register"
            role="button"
            aria-expanded="false"
          >
            註冊
          </Link>
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
