import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import validator from 'validator'
import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import styles from './loader.module.css'
import { useLoader } from '@/hooks/use-loader'

export default function LoginForm() {
  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { loginGoogleRedirect, initApp } = useFirebase()
  const { auth, setAuth } = useContext(AuthContext)
  const [formVals, setFormVals] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const router = useRouter()
  const { showLoader } = useLoader()

  // 載入指示器與載入的資料切換用的信號狀態
  // 預設為true代表一開始就在載入伺服器資料
  const [isLoading, setIsLoading] = useState(false)

  // loader樣式
  // const loader = (
  //   <div className={styles['lds-spinner']}>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //   </div>
  // )

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
    showLoader()
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    if (providerData.uid) {
      console.log(`-----`)
      router.push('/')
      // setTimeout(() => {
      //   setIsLoading(false)
      // }, 10000)
    }
    // 如果目前已經登入中，不需要再作登入動作
    if (auth.isAuth) return

    const res = await axios.post(
      'http://localhost:3005/user/google-login-jwt',
      providerData
    )

    console.log(res.data)
    if (res.data.success && res.data.code == 200) {
      localStorage.setItem('authJWT', JSON.stringify(res.data.data))
      setAuth(res.data.data)
      console.log(auth)
      router.push('/')
    }
  }

  // 進來之後判斷是不是已經登入
  useEffect(() => {
    if (auth.isAuth) {
      if (router.query.url) {
        router.push(router.query.url)
      } else {
        router.push('/')
      }
    }
  }, [router, auth.isAuth])

  // 所有欄位共用的事件處理函式
  const myFiledChanged = (e) => {
    const { id, value } = e.target
    const newVals = { ...formVals, [id]: value }
    setFormVals(newVals)
  }

  // 判斷某欄位是否有發生驗証錯誤(有錯誤訊息)
  const hasError = (errors, fieldname) => {
    return !!errors[fieldname]
  }

  // 驗証所有欄位(或單一欄位)的函式
  const validateFields = (formVals, errors, fieldname = '') => {
    // 先建立空白的錯誤訊息，代表每次檢查均需重置所有錯誤訊息開始檢查起
    const newErrors = {}
    Object.keys(errors).forEach((prop) => (newErrors[prop] = ''))

    if (validator.isEmpty(formVals.email, { ignore_whitespace: true })) {
      newErrors.email ||= '電子郵件為必填欄位'
    }

    if (!validator.isEmail(formVals.email)) {
      newErrors.email ||= '電子郵件格式不正確'
    }

    if (validator.isEmpty(formVals.password, { ignore_whitespace: true })) {
      newErrors.password ||= '密碼為必填欄位'
    }
    return fieldname
      ? { ...errors, [fieldname]: newErrors[fieldname] }
      : newErrors
  }

  // 每欄位失焦時會進行該欄位的檢查，如果有錯誤會呈現，或是正確後消去錯誤訊息
  const handleBlur = (e) => {
    const newErrors = validateFields(formVals, errors, e.target.id)
    setErrors(newErrors)
  }

  const sendform = (e) => {
    e.preventDefault() // 不要讓表單以傳統方式送出
    const inputs = e.target.elements

    // 驗証錯誤後，呈現錯誤訊息
    const newErrors = validateFields(formVals, errors)
    setErrors(newErrors)

    // 對所有欄位進行迴圈，聚焦(focus)在第一個發生錯誤的欄位
    for (let i = 0; i < inputs.length; i++) {
      if (
        inputs[i].nodeName === 'INPUT' &&
        hasError(newErrors, inputs[i].name)
      ) {
        inputs[i].focus()
        return // 這裡不用break，因為有找到錯誤，直接用return跳出此函式
      }
    }

    // 如果完全驗証後無錯誤，才會執行到這裡的程式碼
    console.log(formVals)

    const MySwal = withReactContent(Swal)

    // v----- 開始fetch -----v
    fetch(`http://${location.hostname}:3005/user/login-jwt`, {
      method: 'POST',
      body: JSON.stringify(formVals),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj)
        if (obj.success && obj.data?.email) {
          console.log(obj.data.email)
          localStorage.setItem('authJWT', JSON.stringify(obj.data))
          setAuth(obj.data)
          // console.log(auth)
        } else {
          Swal.fire({
            icon: 'error',
            text: '帳號或密碼錯誤!',
          })
        }
      })
    // .catch((ex) => console.log(ex))
  }

  return (
    <>
      <div className="container-login mt-120">
        <div className="container-login-img">
          <button
            style={{ border: 0, backgroundColor: 'transparent' }}
            onClick={() => {
              setFormVals({
                email: 'yuju1026@gmail.com',
                password: 'Aa@12345',
              })
              setErrors({ email: '', password: '' })
            }}
          >
            <img
              src="/images/user/login-cat.jpg"
              alt="login-img"
              width="100%"
            />
          </button>
        </div>

        <div className="container-login-content">
          <h2 className="text-center container-login-title">會員登入</h2>
          <div className="login-form w-100">
            <form onSubmit={sendform}>
              <div className="mb-4 input-group-style">
                <div className="input-group-img-style">
                  <img
                    src="/images/user/profile.svg"
                    alt="profile"
                    width={25}
                    height={25}
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  className="form-control-style"
                  onChange={myFiledChanged}
                  onBlur={handleBlur}
                  placeholder="請輸入Email"
                  value={formVals.email}
                />
              </div>
              <div className="mb-3 error">{errors.email}</div>

              <div className="mb-3 input-group-style">
                <div className="input-group-img-style">
                  <img
                    src="/images/user/password.svg"
                    alt="profile"
                    width={25}
                    height={25}
                  />
                </div>
                <input
                  type="password"
                  className="form-control-pwd"
                  id="password"
                  onChange={myFiledChanged}
                  onBlur={handleBlur}
                  placeholder="請輸入密碼"
                  value={formVals.password}
                />
                <div className="input-group-img-style">
                  <img
                    src="/images/user/hide.svg"
                    alt="see-password"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
              <div className="mb-3 error">{errors.password}</div>

              <div className="row mb-3">
                <Link
                  href="/user/forget-password"
                  role="button"
                  className="forget-password-link"
                >
                  忘記密碼
                </Link>
              </div>
              <button
                type="submit"
                className="mybtny mybtny--s mybtny--b w-100 mb-4"
              >
                登入
              </button>
              <button
                type="submit"
                className="mybtny mybtny--s mybtny--b w-100 mb-2"
              >
                註冊
              </button>
            </form>

            <div className="mb-3 mt-3 hr-sect">快速登入</div>

            <button
              type="submit"
              className="mybtny mybtny--s mybtny--c w-100"
              onClick={() => {
                loginGoogleRedirect()
                setIsLoading(true)
                // initApp(callbackGoogleLoginRedirect)
              }}
            >
              <img
                src="/images/user/google-logo.svg"
                alt="googleLogo"
                width={22}
                height={22}
                className="me-2"
              />
              以Google帳號登入
            </button>
          </div>
        </div>
      </div>
    </>
  )

  // return <>{isLoading ? loader : initLogin}</>
}
