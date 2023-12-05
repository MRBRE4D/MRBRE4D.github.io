import { useEffect, useState, useContext } from 'react'
import validator from 'validator'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TWZipCode from '@/components/common/TWZipCode'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useLoader } from '@/hooks/use-loader'

export default function EditForm() {
  const { auth, setAuth } = useContext(AuthContext)
  const MySwal = withReactContent(Swal)
  const router = useRouter()
  const { showLoader } = useLoader()

  console.log(auth)
  const { id, token, isAuth } = auth
  console.log(id)

  // 儲存表單各欄位填入資料用state
  const [data, setData] = useState({})

  // // 進來之後判斷是不是已經登入
  // useEffect(() => {
  //   if (!isAuth) {
  //     window.location.href = '/'
  //     // router.push('/')
  //   }
  // }, [isAuth])

  useEffect(() => {
    showLoader()
    fetch(`http://localhost:3005/user/getuser?token=${token}&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        setData({
          username: data.userData.u_name,
          email: data.userData.email,
          password: 'Aa@12345',
          password2: 'Aa@12345',
          nickname: data.userData.nickname,
          birthday: '1988-02-05',
          mobile: data.userData.mobile,
          postcode: `${data.userData.local_id}`,
          addr3: data.userData.addr,
        })
      })
      // .then(delay(1000)) // 延時3秒後再停止載入器，只有手動控制有用，自動關閉會無用
      // .then(hideLoader)
      .catch((error) => {
        console.error(error)
      })
  }, [id, token])

  // 儲存表單各欄位發生錯誤的訊息用state
  const [errors, setErrors] = useState({ ...data })

  // 所有欄位共用的事件處理函式
  const handleFieldChange = (e) => {
    const { name, value } = e.target
    const newData = { ...data, [name]: value }
    setData(newData)
  }

  // 判斷某欄位是否有發生驗証錯誤(有錯誤訊息)
  const hasError = (errors, fieldname) => {
    return !!errors[fieldname]
  }

  // 驗証所有欄位(或單一欄位)的函式
  const validateFields = (data, errors, fieldname = '') => {
    // 先建立空白的錯誤訊息，代表每次檢查均需重置所有錯誤訊息開始檢查起
    const newErrors = {}
    Object.keys(errors).forEach((prop) => (newErrors[prop] = ''))

    // 以下使用`||=`語法是同時間只有一個錯誤訊息，而且會寫在愈上面檢查的為主

    if (validator.isEmpty(data.password, { ignore_whitespace: true })) {
      newErrors.password ||= '密碼為必填欄位'
    }

    if (
      !validator.isStrongPassword(data.password, {
        minLength: 6, // 最小字元數
        minLowercase: 1, // 最少要幾個小寫英文字元
        minUppercase: 1, // 最少要幾個大寫英文字元
        minNumbers: 1, // 最少要幾個數字
        minSymbols: 1, // 最少要幾個符號
      })
    ) {
      newErrors.password ||=
        '密碼至少6個至多8個字元，需包含英文大寫、小寫、數字及符號'
    }

    if (data.password.length > 8) {
      newErrors.password ||= '密碼至多8個字元'
    }

    if (data.password !== data.password2) {
      newErrors.password2 ||= '密碼與確認密碼要一致'
    }

    if (validator.isEmpty(data.email, { ignore_whitespace: true })) {
      newErrors.email ||= '電子郵件為必填欄位'
    }

    if (!validator.isEmail(data.email)) {
      newErrors.email ||= '電子郵件格式不正確'
    }

    if (validator.isEmpty(data.username, { ignore_whitespace: true })) {
      newErrors.username ||= '姓名為必填欄位'
    }

    // 回傳視是單欄位檢查(blur)->回傳只改變此欄位errors物件
    // 還是全體檢查(submit)->回傳整個改變過errors物件
    return fieldname
      ? { ...errors, [fieldname]: newErrors[fieldname] }
      : newErrors
  }

  // 每欄位失焦時會進行該欄位的檢查，如果有錯誤會呈現，或是正確後消去錯誤訊息
  const handleBlur = (e) => {
    const newErrors = validateFields(data, errors, e.target.name)
    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const inputs = e.target.elements

    // 驗証錯誤後，呈現錯誤訊息
    const newErrors = validateFields(data, errors)
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
    console.log(data)

    // v----- 這是 fetch 的寫法 -----v
    // fetch('http://localhost:3005/user', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((r) => r.json())
    //   .then((obj) => {
    //     console.log(obj)
    //   })

    // v----- 這是 axios 的寫法(前面記得加async) -----v
    const res = await axios.put('http://localhost:3005/user/update', data)
    console.log(res)

    if (res.data.success) {
      Swal.fire({
        icon: 'success',
        text: '修改成功!',
      })
        .then(showLoader())
        .then(function () {
          router.push('/user')
          // window.location.href = '/user'
        })
    }

    setAuth({
      isAuth: true,
      // id: '',
      email: data.email,
      nickname: data.nickname,
    })
    console.log(auth)
  }

  return (
    <>
      <div className="register-main-container">
        <div className="register-container">
          <h2 className="register-title mb-3">會員資料編輯</h2>
          <form className="register-form-container" onSubmit={handleSubmit}>
            <h1 className="mb-3 user-hr-register-sect">帳號設定</h1>

            {/* 帳號設定 */}
            <div className="account-main">
              <div className="account-main-text">
                <div className="mb-3 row">
                  <label
                    htmlFor="email"
                    className="col-sm-3 col-form-label font-align"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      value={data.email}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <p className="error">{errors.email}</p>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="password"
                    className="col-sm-3 col-form-label font-align"
                  >
                    密碼
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control password"
                      id="password"
                      name="password"
                      placeholder="請輸入修改密碼"
                      maxLength={8}
                      value={data.password}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <p className="error">{errors.password}</p>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="password2"
                    className="col-sm-3 col-form-label font-align"
                  >
                    確認密碼
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      id="password2"
                      placeholder="請確認修改密碼"
                      maxLength={8}
                      value={data.password2}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <p className="error">{errors.password2}</p>
              </div>

              {/* 大頭貼 */}
              <div className="accont-main-avatar">
                <img
                  src="/images/user/user-avatar.jpg"
                  className="account-user-avatar"
                  alt="user-avatar"
                />
                {/* <button type="button" className="register-btn">
                編輯
              </button> */}
              </div>
            </div>

            <h3 className="mb-3 mt-3 user-hr-register-sect">個人資料</h3>
            {/* 個人資料 */}
            <div className="account-sub">
              <div className="mb-3 row">
                <label
                  htmlFor="username"
                  className="col-sm-2 col-form-label font-align"
                >
                  姓名
                </label>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    value={data.username}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                  />
                  <p className="error">{errors.username}</p>
                </div>
                <label
                  htmlFor="nickname"
                  className="col-sm-2 col-form-label font-align-center"
                >
                  暱稱
                </label>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    name="nickname"
                    id="nickname"
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    value={data.nickname}
                  />
                </div>
              </div>

              <div className="mb-4 row">
                <label
                  htmlFor="birthday"
                  className="col-sm-2 col-form-label font-align"
                >
                  生日
                </label>
                <div className="col-4">
                  <input
                    type="date"
                    className="form-control"
                    name="birthday"
                    id="birthday"
                    value={data.birthday}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                  />
                </div>
                <label
                  htmlFor="mobile"
                  className="col-sm-2 col-form-label font-align-center"
                >
                  手機
                </label>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    id="mobile"
                    value={data.mobile}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="addr1"
                  className="col-sm-2 col-form-label font-align"
                >
                  地址
                </label>
                <div className="col-4 addr-select">
                  <TWZipCode
                    initPostcode={data.postcode}
                    onPostcodeChange={(country, township, postcode) => {
                      // console.log({country, township, postcode})
                      setData((prev) => ({
                        ...prev,
                        country,
                        township,
                        postcode,
                      }))
                    }}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="addr3"
                    name="addr3"
                    value={data.addr3}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className="btn-container mb-2">
              <button type="submit" className="mybtny mybtny--s mybtny--e mt-1">
                確認修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
