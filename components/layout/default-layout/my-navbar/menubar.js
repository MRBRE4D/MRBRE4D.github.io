import Link from 'next/link'
import MegaMenu from './mega-menu'
import styles from './menubar.module.scss'

// 說明:
// 選單客製化以靜態方式、移至config檔案或寫死(hard code)來產生是常見
// 選單項目定義在這裡，下面元件程式碼會自動產生對應的dom
// MegaMenu比複雜，獨立定義自己的項目(在下面的megaMenuItems)
// id是作key用的，不重覆即可
// 有下拉的選單需要加一個children的陣列屬性
const menuItems = [
  {
    id: 1,
    label: '認養伴旅',
    href: '/stray',
    children: [
      { id: 12, label: '浪浪', href: '/stray' },
      { id: 13, label: '填寫表單', href: '/stray/form' },
    ],
  },
  {
    id: 2,
    label: '醫療指南',
    href: '/clinic',
  },
  {
    id: 3,
    label: '毛毛論壇',
    href: '/forum',
    children: [
      { id: 32, label: '貓貓論壇', href: '/forum' },
      { id: 33, label: '狗狗論壇', href: 'dog-forum' },
      { id: 34, label: '醫療論壇', href: '/med-forum' },
    ],
  },
  {
    id: 4,
    label: '伴旅商鋪',
    href: '/product',
    children: [
      { id: 41, label: '商城首頁', href: '/product' },
      { id: 42, label: '商品列表', href: '/product/list' },
    ],
  },
  {
    id: 5,
    label: '火化告別',
    href: '/fire',
  },
]

export default function MainMenu({ currentRoute = '/' }) {
  return (
    <>
      <ul className="navbar-nav mx-auto">
        {menuItems.map((v) => {
          // 用children判斷是否有下拉選單
          if (!v.children) {
            return (
              <li className="nav-item" key={v.id}>
                <Link
                  className={`nav-link nav-scroll-chg ${
                    currentRoute === v.href
                      ? 'active ' + styles['custom-active']
                      : ''
                  }`}
                  aria-current="page"
                  href={v.href}
                >
                  {v.label}
                </Link>
              </li>
            )
          }

          // 以下為有dropmenu(下拉選單)的選單項目的jsx
          return (
            <li
              className={`nav-item  dropdown ${styles['dropdown']}`}
              key={v.id}
            >
              <Link
                // 尋找是否有符合 currentRoute 的 children href
                className={`nav-link nav-scroll-chg dropdown-toggle ${
                  v.children.find((v) => v.href === currentRoute)
                    ? 'active ' + styles['custom-active']
                    : ''
                }`}
                href={v.href}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {v.label}
              </Link>
              <ul
                className={`dropdown-menu ${styles['slideIn']} ${styles['dropdown-menu']}`}
              >
                {v.children.map((v2) => {
                  return (
                    <li key={v2.id}>
                      <Link
                        className={`dropdown-item ${
                          currentRoute === v2.href ? 'active' : ''
                        }`}
                        href={v2.href}
                      >
                        {v2.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
        {/* 這裡附加上MegaMenu */}
        {/* currentRoute是目前的路由位置，為了要套用選單項目的active類別用 */}
        {/* <MegaMenu megaMenuItems={megaMenuItems} currentRoute={currentRoute} /> */}
      </ul>
    </>
  )
}
