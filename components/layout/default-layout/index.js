// import MyNavbar from './my-navbar-nouse'
import { useState, useEffect } from 'react'
import MyNavbarBS5 from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import { useLoader } from '@/hooks/use-loader'

export default function DefaultLayout({ title = '', children }) {
  const { loader, loaderText } = useLoader()
  useEffect(() => {
    const ChangeNavBg = () => {
      const navbar = document.querySelector('nav')
      const navLink = document.querySelectorAll('.nav-scroll-chg')
      const logoImg = document.getElementById('logo')

     

      if (window.scrollY == 0) {
        navbar.style.background = 'transparent'
        logoImg.src='/Logo.svg'
        navLink.forEach((element) => {
          element.style.color = '#584438'
        })
      } else if (window.scrollY > 5200) {
        logoImg.src='/Logo-w.svg'
        navbar.style.background = 'transparent'
        navLink.forEach((element) => {
          element.style.color = '#fff'
        })
      } else if (window.scrollY >= 80) {
        logoImg.src='/Logo.svg'
        navbar.style.background =
          'linear-gradient(180deg, rgba(255,250,236,.8) 0%, rgba(255,250,236,.4) 40% , rgba(255,250,236,0) 100%)'
        navLink.forEach((element) => {
          element.style.color = '#584438'
        })
      }
    }
    ChangeNavBg()

    window.addEventListener('scroll', ChangeNavBg)

    return () => {
      window.removeEventListener('scroll', ChangeNavBg)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbarBS5 />
      <main className="flex-shrink-0">
        <div>{children}</div>
        {/* 全域的載入動畫指示器 */}
        {loader()}
        {/* {loaderText('載入中請稍後')} */}
      </main>
      <MyFooter />
    </>
  )
}
