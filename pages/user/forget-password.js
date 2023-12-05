import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
// countdown use
import useInterval from '@/hooks/use-interval'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  // countdown use
  const [count, setCount] = useState(10) // 60s
  const [delay, setDelay] = useState(null) // delay=null to stop, delay=1000 to start
  const MySwal = withReactContent(Swal)

  // countdown use
  useInterval(() => {
    setCount(count - 1)
  }, delay)

  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
    }
  }, [count])

  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s內無法重新獲得驗証碼')
      return
    }

    const res = await axios.post('http://localhost:3005/user/otp', {
      email,
    })

    console.log(res.data)
    if (res.data.message === 'fail') {
      setMessage('驗証碼取得失敗，請確認Email是否已經註冊')
    }

    if (res.data.message === 'email sent') {
      setMessage('驗証碼已寄送到你填寫的Email信箱中')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
  }

  const resetPassword = async () => {
    const res = await axios.post('http://localhost:3005/user/reset', {
      email,
      token,
      password,
    })

    if (res.data.message === 'success') {
      // setMessage('密碼已成功修改!')
      Swal.fire({
        icon: 'success',
        text: '密碼已成功修改!',
      }).then(router.push('/user/login'))
    } else {
      // setMessage('密碼修改失敗!')
      Swal.fire({
        icon: 'error',
        text: '密碼修改失敗!',
      })
    }
    console.log(res.data)
  }
  return (
    <>
      <div className="forget-pwd-container">
        <h2 className="register-title mb-4">忘記密碼</h2>
        <h5 style={{ color: '#ff6600' }}> {message}</h5>

        <label className="forget-pwd-label mb-3">
          Email：
          <input
            type="text"
            style={{ width: '300px' }}
            className="forget-pwd-input-email"
            placeholder="請輸入Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="otp-btn" onClick={getOtp}>
            取得驗証碼
          </button>
        </label>

        <div style={{ color: '#ff6600', fontSize: '18px' }} className="mb-2">
          {delay ? count + '秒後可以再次取得驗証碼' : ''}
        </div>

        <label className="forget-pwd-label mb-4">
          電子郵件驗証碼：
          <input
            type="text"
            placeholder="請輸入驗證碼"
            className="forget-pwd-input"
            style={{ width: '320px' }}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>

        <label className="forget-pwd-label mb-4">
          新密碼：
          <input
            type="password"
            placeholder="請輸入新密碼"
            className="forget-pwd-input"
            style={{ width: '400px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          className="mb-3 mybtny mybtny--s mybtny--c"
          style={{ marginLeft: '200px' }}
          onClick={resetPassword}
        >
          重設密碼
        </button>
      </div>
    </>
  )
}
