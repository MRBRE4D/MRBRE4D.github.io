import React, { useContext, useState } from 'react'
import validator from 'validator'
import { CartContext } from '@/hooks/use-cart'
import { useRouter } from 'next/router'
// import Table from 'react-bootstrap/Table'

export default function Payment() {
  const { cart, dispatch } = useContext(CartContext)
  // console.log(cart)
  const router = useRouter()
  // 初始用物件，填入資料與呈現錯誤訊息均需要
  const initData = {
    name: '',
    phone: '',
    address: '',
    email: '',
    note: '',
  }
  const autoTab = () => {
    setData({
      name: '吳青峰',
      phone: '0980888579',
      address: '台北市忠孝西路一段27號2樓',
      email: 'geniegotmail@gmail.com',
      note: '小心碰撞謝謝您~',
    })
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
    const localKey = 'CartInfo'
    localStorage.setItem(localKey, JSON.stringify(data))
    router.push('/cart/confirm')
  }

  const FirstPimg = (item) => {
    return item.file.split(',')[0]
  }
  // 計算價錢
  const { items, total } = cart.reduce(
    ({ items, total }, { price, quantity }) => ({
      items: items + quantity,
      total: total + quantity * price,
    }),
    { items: 0, total: 0 }
  )

  return (
    <>
      <div className="container mt-120 mb-5">
        {/* 步驟 */}
        <div className="step-bar  ">
          <div className="cart-step  ">
            <img src="/images/product/cart/step-1-default.svg" alt="" />
            <div className="step-title">
              <h6>確認購物車</h6>
            </div>
          </div>
          <span className="cart-line"></span>
          <div className="cart-step ">
            <img src="/images/product/cart/step-2-selected.svg" alt="" />
            <div className="step-title">
              <button
                type="button"
                onClick={() => autoTab()}
                style={{ border: 'none', backgroundColor: 'transparent' }}
              >
                <h6>付款資訊</h6>
              </button>
            </div>
          </div>
          <span className="cart-line"></span>
          <div className="cart-step ">
            <img src="/images/product/cart/step-3-default.svg" alt="" />
            <div className="step-title">
              <h6>確認付款</h6>
            </div>
          </div>
        </div>

        <div className=" d-flex flex-nowrap justify-content-center align-items-start mt-5">
          <form
            className="block-payment-form col-8 me-5 mt-3 flex-grow-1"
            onSubmit={handleSubmit}
          >
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="name"
                className="col-form-label font-align me-3 col-2"
              >
                收件者姓名:
              </label>
              <div className="d-flex flex-wrap w-100">
                <input
                  type="text"
                  className="form-control w-100"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <div className="error h-50">{errors.name}</div>
              </div>
            </div>
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="phone"
                className="col-form-label font-align me-3 col-2"
              >
                收件電話:
              </label>
              <div className="d-flex flex-wrap w-100">
                {' '}
                <input
                  type="text"
                  className="form-control w-100"
                  name="phone"
                  id="phone"
                  value={data.phone}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <div className="error">{errors.phone}</div>
              </div>
            </div>
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="address"
                className="col-form-label font-align me-3 col-2"
              >
                收件地址:
              </label>
              <div className="d-flex flex-wrap w-100">
                {' '}
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  value={data.address}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <div className="error">{errors.address}</div>
              </div>
            </div>
            <div className="d-flex w-100 mb-4">
              <label
                htmlFor="email"
                className="col-form-label font-align me-3 col-2"
              >
                電子信箱:
              </label>
              <div className="d-flex flex-wrap w-100">
                {' '}
                <input
                  type="text"
                  className="form-control w-100"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <div className="error">{errors.email}</div>
              </div>
            </div>
            <div className="d-flex w-100">
              <label
                htmlFor="note"
                className="col-form-label font-align me-3 col-2"
              >
                訂單備註:
              </label>
              <textarea
                type="text"
                className="form-control w-100"
                name="note"
                id="note"
                value={data.note}
                onChange={handleFieldChange}
              />
            </div>
            <div className="row mt-3">
              {' '}
              <div className="col-6"></div>
              <div className="col-6">
                {/* <button
                  className="me-2 mybtny mybtny--s mybtny--e"
                  onClick={() => router.back()}
                >
                  上一步
                </button> */}
                <button className=" mybtny mybtny--s mybtny--e">下一步</button>
              </div>
            </div>
          </form>

          <div className="col-4 mb-5 ">
            <table className="w-100 cart-table">
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
                        <div className="d-flex align-items-center">
                          <img
                            className="pimg"
                            src={`/images/product/pid/${FirstPimg(v)}`}
                            alt=""
                          />
                          <h6>{v.name}</h6>
                        </div>
                      </td>
                      <td>{v.quantity}</td>
                      <td>
                        <h5>{v.price * v.quantity}</h5>
                      </td>
                    </tr>
                  )
                })}{' '}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    總計: <span className="payment-total-price">${total}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
