import React, { useContext, useState } from 'react'
import validator from 'validator'
import { CartContext } from '@/hooks/use-cart'
// import Table from 'react-bootstrap/Table'

export default function Payment() {
  const { cart, dispatch } = useContext(CartContext)
  console.log(cart)

  // 初始用物件，填入資料與呈現錯誤訊息均需要
  const initData = {
    name: '',
    phone: '',
    address: '',
    email: '',
  }

  const [data, setData] = useState(initData)

  // 儲存表單各欄位發生錯誤的訊息用state
  const [errors, setErrors] = useState({ ...initData })

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

  // 每欄位失焦時會進行該欄位的檢查，如果有錯誤會呈現，或是正確後消去錯誤訊息
  const handleBlur = (e) => {
    const newErrors = validateFields(data, errors, e.target.name)
    setErrors(newErrors)
  }
  // 驗証所有欄位(或單一欄位)的函式
  const validateFields = (data, errors, fieldname = '') => {
    // 先建立空白的錯誤訊息，代表每次檢查均需重置所有錯誤訊息開始檢查起
    const newErrors = {}
    Object.keys(errors).forEach((prop) => (newErrors[prop] = ''))

    // 以下使用`||=`語法是同時間只有一個錯誤訊息，而且會寫在愈上面檢查的為主

    if (validator.isEmpty(data.name, { ignore_whitespace: true })) {
      newErrors.name ||= '收件人為必填欄位'
    }
    // eslint-disable-next-line
    if (!/09\d{2}\-?\d{3}\-?\d{3}/.test(data.phone)) {
      newErrors.phone ||= '請輸入正確的手機號碼'
    }

    if (validator.isEmpty(data.address, { ignore_whitespace: true })) {
      // newErrors.password ||= '密碼與確認密碼要一致'
      newErrors.address ||= '收件地址為必填欄位'
    }

    if (!validator.isEmail(data.email)) {
      newErrors.email ||= '電子郵件格式不正確'
    }

    // 回傳視是單欄位檢查(blur)->回傳只改變此欄位errors物件
    // 還是全體檢查(submit)->回傳整個改變過errors物件
    return fieldname
      ? { ...errors, [fieldname]: newErrors[fieldname] }
      : newErrors
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
    // !這裡寫送出
  }

  const FirstPimg = (item) => {
    return item.file.split(',')[0]
  }

  return (
    <>
      <div className="container">
        <div className="w-100 d-flex flex-nowrap justify-content-center align-items-start mt-120">
          <form
            className="block-payment-form col-8 me-5"
            onSubmit={handleSubmit}
          >
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="name"
                className="col-form-label font-align me-3 col-2"
              >
                收件者姓名
              </label>
              <div className="d-flex flex-wrap w-100">
                <input
                  type="text"
                  className="form-control w-100"
                  name="name"
                  id="name"
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <p className="error">{errors.name}</p>
              </div>
            </div>
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="phone"
                className="col-form-label font-align me-3 col-2"
              >
                收件電話
              </label>
              <div className="d-flex flex-wrap w-100">
                {' '}
                <input
                  type="text"
                  className="form-control w-100"
                  name="phone"
                  id="phone"
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <p className="error">{errors.phone}</p>
              </div>
            </div>
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="address"
                className="col-form-label font-align me-3 col-2"
              >
                收件地址
              </label>
              <div className="d-flex flex-wrap w-100">
                {' '}
                <input
                  type="text"
                  className="form-control w-100"
                  name="address"
                  id="address"
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <p className="error">{errors.address}</p>
              </div>
            </div>
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="email"
                className="col-form-label font-align me-3 col-2"
              >
                電子信箱
              </label>
              <div className="d-flex flex-wrap w-100">
                {' '}
                <input
                  type="text"
                  className="form-control w-100"
                  name="email"
                  id="email"
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <p className="error">{errors.email}</p>
              </div>
            </div>
            <div className="d-flex w-100">
              <label
                htmlFor="note"
                className="col-form-label font-align me-3 col-2"
              >
                訂單備註
              </label>
              <textarea
                type="text"
                className="form-control w-100"
                name="note"
                id="note"
              />
            </div>
            <button className="mybtny mybtny--s mybtny--e">確認</button>
          </form>

          <div className="block-payment-card col-4">
            <table className="w-100 ">
              <thead>
                <tr>
                  <th>產品名</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img
                          className="pimg"
                          src={`/images/product/pid/${FirstPimg(v)}`}
                          alt=""
                        />
                      </td>
                      <td>
                        <h6>{v.name}</h6>
                      </td>
                      <td>
                        <h5>{v.price}</h5>
                      </td>
                    </tr>
                  )
                })}
                {cart.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td colSpan={3}>總計：{v.price * cart[i].quantity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
