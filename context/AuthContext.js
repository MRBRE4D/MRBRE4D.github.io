import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AuthContext = createContext({})

export default AuthContext

export const noLoginState = {
  isAuth: false,
  id: '',
  email: '',
  nickname: '',
}

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(noLoginState)
  const router = useRouter()
  const MySwal = withReactContent(Swal)

  // 登出的功能
  const logout = () => {
    localStorage.removeItem('localCart')
    localStorage.removeItem('authJWT')
    setAuth(noLoginState)
    Swal.fire({
      icon: 'success',
      text: '登出成功!',
    })
    router.push('/')
    // window.location.href = '/'
  }

  useEffect(() => {
    const str = localStorage.getItem('authJWT')
    if (str) {
      try {
        const myAuth = JSON.parse(str)
        setAuth(myAuth)
      } catch (ex) {
        console.log(ex)
      }
    }
  }, [])
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
