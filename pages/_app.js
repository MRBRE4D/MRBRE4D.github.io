import { useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { ProductProvider } from '@/hooks/product-fetch'
import { CartProvider } from '@/hooks/use-cart'
import { AuthContextProvider } from '@/context/AuthContext'
import { AuthProviderJWT } from '@/hooks/use-auth-jwt'
// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
// 自訂用載入動畫元件
import { CatLoader } from '@/hooks/use-loader/components'
import '@/styles/globals.scss'
import '@/styles/swal2.scss'
import '@/styles/button.scss'
import '@/styles/navbar.scss'
import '@/styles/home.scss'
import '@/styles/user.scss'
import '@/styles/user-index.scss'
import '@/styles/pet-calendar.scss'
import '@/styles/pet-health.scss'
import '@/styles/pet-edit.scss'
import '@/styles/product.scss'
import '@/styles/cart.scss'
import '@/styles/stray-clinic.scss'
import '@/styles/fire.scss'
import '@/styles/forum.scss'
import '@/styles/article.scss'
import '@/styles/carousel.scss'
import '@/styles/forum-post.scss'
import '@/styles/loader.scss'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`(或components/layout/default-layout.js)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <AuthContextProvider>
      <ProductProvider>
        <LoaderProvider close={2} CustomLoader={CatLoader}>
          <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
        </LoaderProvider>
      </ProductProvider>
    </AuthContextProvider>
  )
  // return (
  //   <AuthProviderJWT>
  //     <AuthProvider>
  //       <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
  //     </AuthProvider>
  //   </AuthProviderJWT>
  // )
}
