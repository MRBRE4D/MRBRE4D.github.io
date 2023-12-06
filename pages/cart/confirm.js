import { CartContext } from '@/hooks/use-cart'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { clearCart } from '@/hooks/cart-reducer'
export default function Confirm() {
  const { cart, dispatch } = useContext(CartContext)
  const router = useRouter()
  const [info, setInfo] = useState([])
  const FirstPimg = (item) => {
    return item.file.split(',')[0]
  }
  const { items, total } = cart.reduce(
    ({ items, total }, { price, quantity }) => ({
      items: items + quantity,
      total: total + quantity * price,
    }),
    { items: 0, total: 0 }
  )
  // 運費
  const deliverCost = 60
  // 優惠券
  const couponVal = 100

  // 購買者資訊的 localStorage key
  const localKey = 'CartInfo'

  useEffect(() => {
    if (window.localStorage !== 'undefined') {
      const user =
        typeof window !== 'undefined' ? localStorage.getItem(localKey) : null
      const userObj = JSON.parse(user)

      setInfo(userObj)
    }
  }, [])

  // localStorage.setItem(localKey, JSON.stringify(info))
  // 送出alert

  const subAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '訂單已送出',
      text: `出貨將以簡訊通知，確認後回到商品頁。`,
    })
      .then(() => router.push('/product/list'))
      .then(() => {
        dispatch(clearCart())
      })
  }
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
            <img src="/images/product/cart/step-2-default.svg" alt="" />
            <div className="step-title">
              <h6>付款資訊</h6>
            </div>
          </div>
          <span className="cart-line"></span>
          <div className="cart-step ">
            <img src="/images/product/cart/step-3-selected.svg" alt="" />
            <div className="step-title">
              <h6>確認付款</h6>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className=" d-flex">
            <div className="col-8 me-5">
              {cart.length > 0 && (
                <table className=" table cart-table me-5 ">
                  <thead>
                    <tr>
                      <th>圖片</th>
                      <th>商品</th>
                      <th>單價</th>
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
                          <td>{v.quantity}</td>
                          <td>
                            <h5>{v.price * cart[i].quantity}</h5>
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      {' '}
                      <td
                        colSpan="5"
                        className=" "
                        style={{ textAlign: 'right' }}
                      >
                        <div className="me-2 fs-2 d-flex justify-content-around ">
                          總金額:{'  '}${total - couponVal}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            <div className="col-4 order-container   mt-5 ">
              <div className="order-title">訂購者資訊</div>
              <div className="order-info">
                {' '}
                <div>
                  <span className="me-2">訂購者姓名:</span>
                  {info.name}
                </div>
                <div>
                  <span className="me-2">手機:</span>
                  {info.phone}
                </div>
                <div>
                  <span className="me-2">地址:</span>
                  {info.address}
                </div>
                <div>
                  <span className="me-2">E-mail:</span>
                  {info.email}
                </div>
                <div>
                  <span className="me-2">備註:</span>
                  {info.note}
                </div>
              </div>
            </div>
            <div className="row mb-5"> </div>
          </div>
          <div className="col-6"></div>
          <div className="col-6 mt-3 mb-5">
            <button
              type="submit"
              onClick={() => {
                subAlert()
              }}
              className=" mybtny mybtny--s mybtny--e"
            >
              確認送出
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
