import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import validator from 'validator'
import TWZipCode from '@/components/common/TWZipCode'
import { BiIdCard } from 'react-icons/bi'

export default function Form() {
  const MySwal = withReactContent(Swal)
  const router = useRouter()

  const onePounch = () => {
    setData({
      name: '吳青峰',
      address: '伊寧街124巷7號2樓',
      email: 'mfee40lab@gmail.com',
      mobile: '0912345678',
      age: '40',
      profession: '歌手',
      adoptText:
        '陪我走上每一場演唱會，帶他了解狗生的喜悲。無論我忙了又忙，還是傷了又傷，我都想和他分享。',
      agree: '',
      country: '新北市',
      township: '蘆洲區',
      postcode: '247',
    })
  }

  // 初始用物件，填入資料與呈現錯誤訊息均需要
  const initData = {
    name: '',
    address: '',
    email: '',
    mobile: '',
    age: '',
    profession: '',
    adoptText: '',
    agree: '',
    // country: '',
    // township: '',
    postcode: '',
  }

  // 儲存表單各欄位填入資料用state
  const [data, setData] = useState(initData)

  console.log(data.country)
  console.log(data.township)
  console.log(data.postcode)
  // 儲存表單各欄位發生錯誤的訊息用state
  // 這裡調整agree需要是空白字串，它是用來記錄錯誤訊息用的
  const [errors, setErrors] = useState({ ...initData, agree: '' })

  // 所有欄位共用的事件處理函式
  const handleFieldChange = (e) => {
    console.log(e.target.name)
    console.log(e.target)
    console.log(e.target.country)
    // console.log(e.target[e.target.selectedIndex].text)

    console.log(e.target.value)
    console.log(e.target.checked)

    if (e.target.name === 'agree')
      return setData({ ...data, agree: e.target.checked })

    if (e.target.value === '')
      return setData({ ...data, [e.target.name]: e.target.value })

    return setData({ ...data, [e.target.name]: e.target.value })
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
    if (validator.isEmpty(data.name, { ignore_whitespace: true })) {
      newErrors.name ||= '姓名為必填欄位'
    }

    if (validator.isEmpty(data.address, { ignore_whitespace: true })) {
      console.log(data.county)
      newErrors.address ||= '地址為必填欄位'
    }

    if (!data.county) {
      newErrors.county ||= '縣市為必填欄位'
    }

    if (!data.area) {
      newErrors.area ||= '區域為必填欄位'
    }

    // if (
    //   !validator.isStrongPassword(data.password, {
    //     minLength: 8, // 最小字元數
    //     minLowercase: 1, // 最少要幾個小寫英文字元
    //     minUppercase: 1, // 最少要幾個大寫英文字元
    //     minNumbers: 0, // 最少要幾個數字
    //     minSymbols: 0, // 最少要幾個符號
    //   })
    // ) {
    //   newErrors.password ||=
    //     '密碼至少8個至多12個字元，而且至少需包含一個英文大寫與一個英文小寫字元'
    // }

    // if (data.password.length > 12) {
    //   newErrors.password ||= '密碼至多12個字元'
    // }

    // if (data.password !== data.password2) {
    //   newErrors.password ||= '密碼與確認密碼要一致'
    //   newErrors.password2 ||= '密碼與確認密碼要一致'
    // }

    if (validator.isEmpty(data.email, { ignore_whitespace: true })) {
      newErrors.email ||= '電子郵件為必填欄位'
    }

    if (!validator.isEmail(data.email)) {
      newErrors.email ||= '電子郵件格式不正確'
    }

    if (validator.isEmpty(data.mobile, { ignore_whitespace: true })) {
      newErrors.mobile ||= '手機為必填欄位'
    }

    const re = /^09+\d{8}$/
    if (!re.test(data.mobile)) {
      newErrors.mobile ||= '手機格式錯誤'
    }

    if (validator.isEmpty(data.age, { ignore_whitespace: true })) {
      newErrors.age ||= '歲數為必填欄位'
    }

    if (data.age < 20 || data.age > 90) {
      newErrors.age ||= '歲數要介於20~90'
    }

    if (validator.isEmpty(data.profession, { ignore_whitespace: true })) {
      newErrors.profession ||= '職業為必填欄位'
    }

    if (validator.isEmpty(data.adoptText, { ignore_whitespace: true })) {
      newErrors.adoptText ||= '請打原因，讓我們可以更知道!'
    }

    if (!data.agree) {
      newErrors.agree ||= '需要同意會員註冊條款'
    }

    // 回傳視是單欄位檢查(blur)->回傳只改變此欄位errors物件
    // 還是全體檢查(submit)->回傳整個改變過errors物件
    return fieldname
      ? { ...errors, [fieldname]: newErrors[fieldname] }
      : newErrors
  }

  // 每欄位失焦時會進行該欄位的檢查，如果有錯誤會呈現，或是正確後消去錯誤訊息
  const handleBlur = (e) => {
    console.log(data.county)
    const newErrors = validateFields(data, errors, e.target.name)
    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const formdata = new FormData(e.target)
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
    fetch('http://localhost:3005/stray/form', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    Swal.fire({
      title: '<h1 class="adoptTitle">感謝您有意願給寵物們一個永遠的家!</h1>',
      imageUrl: '/images/stray/givemeFiveTwo.svg',
      html: '<p class="adoptFormP" align="left">我們大家花了很多時間了解待領養的寵物們，現在我們也多認識您一些!感謝您完成填寫這份申請表，我們也會盡快的聯絡您。</br></p>',
      buttonsStyling: false,
      confirmButtonText: '關閉',
      customClass: {
        confirmButton: 'adopt',
      },
      position: 'top-center',
    }).then(function () {
      router.push('/stray')
    })
  }

  return (
    <>
      <div className="formContainer">
        <div className="formContent">
          <form className="register-form-container" onSubmit={handleSubmit}>
            <h3 className="mb-2 hr-register-sect">領養表單</h3>
            <BiIdCard
              className="me-2"
              onClick={() => {
                setData({
                  name: '吳青峰',
                  address: '伊寧街124巷7號2樓',
                  email: 'mfee40lab@gmail.com',
                  mobile: '0912345678',
                  age: '40',
                  profession: '歌手',
                  adoptText:
                    '陪我走上每一場演唱會，帶他了解狗生的喜悲。無論我忙了又忙，還是傷了又傷，我都想和他分享。',
                  agree: '',
                  // country: '新北市',
                  // township: '蘆洲區',
                  postcode: '247',
                })
                setErrors({
                  username: '',
                  email: '',
                  password: '',
                  password2: '',
                })
              }}
            />
            {/* 帳號設定 */}
            <div className="account-main">
              <div className="account-main-text">
                <div className="mb-3 row">
                  <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label"
                  >
                    姓名
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={
                        errors.name ? 'error form-control' : 'form-control'
                      }
                      name="name"
                      id="inputName"
                      value={data.name}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <span className="error">{errors.name}</span>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="inputAddr"
                    className="col-sm-2 col-form-label"
                  >
                    地址
                  </label>
                  <div className="col-3 addCode">
                    <TWZipCode
                      initPostcode={data.postcode}
                      onPostcodeChange={(country, township, postcode) => {
                        setData((prev) => ({
                          ...prev,
                          country,
                          township,
                          postcode,
                        }))
                      }}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="address"
                      className={
                        errors.address ? 'error form-control' : 'form-control'
                      }
                      id="inputAddr"
                      value={data.address}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* <span className="error">{errors.county}</span>
                  <span className="error">{errors.area}</span> */}
                  <span className="error">{errors.address}</span>
                </div>
                <div class="mb-3 row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={
                        errors.email ? 'error form-control' : 'form-control'
                      }
                      name="email"
                      id="inputEmail"
                      value={data.email}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <span className="error">{errors.email}</span>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputMobile"
                    className="col-sm-2 col-form-label"
                  >
                    手機
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="mobile"
                      className={
                        errors.mobile ? 'error form-control' : 'form-control'
                      }
                      id="inputMobile"
                      value={data.mobile}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <span className="error">{errors.mobile}</span>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="inputAge" className="col-sm-2 col-form-label">
                    歲數
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      name="age"
                      min={20}
                      max={90}
                      className={
                        errors.age ? 'error form-control' : 'form-control'
                      }
                      id="inputAge"
                      value={data.age}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <span className="error">{errors.age}</span>
                <div className="formText">
                  <h6>動物法規定，領養者須年滿20歲才可以領養</h6>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputProfession"
                    className="col-sm-2 col-form-label"
                  >
                    您的職業
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="profession"
                      type="text"
                      className={
                        errors.profession
                          ? 'error form-control'
                          : 'form-control'
                      }
                      id="inputProfession"
                      value={data.profession}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <span className="error">{errors.profession}</span>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    您為何想要領養寵物?
                  </label>
                  <textarea
                    className={
                      errors.adoptText ? 'error form-control' : 'form-control'
                    }
                    name="adoptText"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={data.adoptText}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                  ></textarea>
                </div>
                <span className="error">{errors.adoptText}</span>
              </div>
            </div>

            <div className="btn-container mb-2">
              <button type="submit" className=" mybtny mybtny--s mybtny--c">
                {/* mybtny mybtny--s mybtny--c */}
                {/* mybtnp mybtnp--m mybtnp--b */}
                送出表單
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
