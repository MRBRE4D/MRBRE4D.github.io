import React, { useContext, useState } from 'react'
import { CartContext } from '@/hooks/use-cart'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import {
  addToCart,
  removeFromCart,
  decrementItemQuantity,
  clearCart,
} from '@/hooks/cart-reducer'
import ToggleBtn from '@/components/product/toggleBtn'
import ShopCard from '@/components/product/shopCard'
import PriceCounter from '@/components/product/priceCounter'

import ProductContext from '@/hooks/product-fetch'

export default function Index() {
  const { cart, dispatch } = useContext(CartContext)
  const getData = useContext(ProductContext)
  const FirstPimg = (item) => {
    return item.file.split(',')[0]
  }

  const router = useRouter()
  // 操作商品數量的函式
  // 增加
  const addToCartHandler = (itemToAdd) => dispatch(addToCart(itemToAdd))
  // 刪除(垃圾桶)
  const removeFromCartHandler = (itemToRemove) =>
    dispatch(removeFromCart(itemToRemove))
  // 減少(不能低於0)
  const decrementQuantity = (item) => dispatch(decrementItemQuantity(item))
  // 全刪
  const clearCartHandler = () => {
    if (cart.length > 0) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger text-light ',
          cancelButton: 'btn btn-success text-light me-3',
        },
        buttonsStyling: false,
      })

      swalWithBootstrapButtons
        .fire({
          title:'注意',
          text: '你要刪除全部商品嗎?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '是，我要刪除。',
          cancelButtonText: '取消',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons
              .fire('刪除成功', '購物車已清空', 'success')
              .then(dispatch(clearCart()))
          } 
          // else if (
          //   /* Read more about handling dismissals below */
          //   result.dismiss === Swal.DismissReason.cancel
          // ) {
          //   swalWithBootstrapButtons.fire(
          //     '已取消操作',
          //     '商品沒有刪除。',
          //     'error'
          //   )
          // }
        })
    } else {
      Swal.fire('購物車沒有商品')
    }
  }

  // 計算價錢
  const { items, total } = cart.reduce(
    ({ items, total }, { price, quantity }) => ({
      items: items + quantity,
      total: total + quantity * price,
    }),
    { items: 0, total: 0 }
  )

  const deleteHandler = (v) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger text-light ',
        cancelButton: 'btn btn-success text-light me-3',
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons
      .fire({
        title: '注意',
        text: '你要刪除此筆商品嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是，我要刪除。',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons
            .fire('刪除成功', '商品已從購物車刪除', 'success')
            .then(console.log(v), removeFromCartHandler(v))
        } 
        // else if (
        //   /* Read more about handling dismissals below */
        //   result.dismiss === Swal.DismissReason.cancel
        // ) {
        //   swalWithBootstrapButtons.fire('已取消操作', '商品沒有刪除。', 'error')
        // }
      })
  }

  // 優惠券
  const [coupon, setCoupon] = useState({ isOpen: false, value: null })
  const couponHandler = (e) => setCoupon({ ...coupon, value: e.target.value })

  return (
    <>
      <div className="container mt-120 ">
        {/* 步驟 */}
        <div className="step-bar  ">
          <div className="cart-step  ">
            <img src="/images/product/cart/step-1-selected.svg" alt="" />
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
            <img src="/images/product/cart/step-3-default.svg" alt="" />
            <div className="step-title">
              <h6>確認付款</h6>
            </div>
          </div>
        </div>
        {/* 狗 */}
        {/* <div className="cart-dog ">
          <img src="/images/product/cart/lay-dog.svg" alt="" />
        </div> */}
        {/* 第一橫排 */}
        <div className="row mt-5">
          {/* 商品列表 */}
          <div className="col-8 mt-1 ">
            <div className="row">
              <div className="col-12">
                <table className="table cart-table">
                  <thead>
                    <tr>
                      <th>圖片</th>
                      <th>商品</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th>小計</th>
                      <th>
                        <button
                          className="mybtnp mybtny--s mybtny--c"
                          type="button"
                          onClick={clearCartHandler}
                        >
                          清空
                        </button>
                      </th>
                    </tr>
                  </thead>
                  {cart.length > 0 ? (
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
                              <h5>{v.name}</h5>
                            </td>
                            <td>
                              <h5>${v.price}</h5>
                            </td>
                            <td>
                              {/* <div className="counter">
                              <button>
                                <i className="fa-solid fa-minus fa-2xs"></i>
                              </button>
                              <div className="num">{v.amount}</div>
                              <button>
                                <i className="fa-solid fa-plus fa-2xs"></i>
                              </button>
                            </div> */}
                              <PriceCounter
                                deleteHandler={deleteHandler}
                                item={v}
                                addToCartHandler={addToCartHandler}
                                removeFromCartHandler={removeFromCartHandler}
                                decrementQuantity={decrementQuantity}
                                quantity={v.quantity}
                              />
                            </td>
                            <td>
                              <h5>${v.price * cart[i].quantity}</h5>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="mybtnp mybtny--s mybtny--c"
                                onClick={() => {
                                  deleteHandler(v)
                                }}
                              >
                                <i className="bi bi-trash trash"></i>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="cart-empty">
                        <td colspan="6">
                          <h2>目前購物車沒有商品</h2>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>

            <div className="row">
              {/* 優惠券 */}
              <div className="toggle-wrapper d-flex align-items-center">
                <h5 className="me-2">優惠券:</h5>
                <div className="toggle dog-rollover">
                  <input
                    id="doggo"
                    type="checkbox"
                    onChange={() => {
                      coupon.isOpen
                        ? setCoupon({ ...coupon, isOpen: false, value: '無' })
                        : setCoupon({ ...coupon, isOpen: true })
                    }}
                  />
                  <label className="toggle-item" htmlFor="doggo">
                    <div className="dog">
                      <div className="ear"></div>
                      <div className="ear right"></div>
                      <div className="face">
                        <div className="eyes"></div>
                        <div className="mouth"></div>
                      </div>
                    </div>
                  </label>
                </div>
                {coupon.isOpen ? (
                  <select
                    className="ms-2 p-1 rounded  border-success border-2 focus-ring focus-ring-success   "
                    onChange={(e) => couponHandler(e)}
                  >
                    <option value="無">請選擇</option>
                    <option value="100">首次登入送好禮</option>
                    <option value="200">首購大驚喜</option>
                    <option value="500">祝你生日大快樂</option>
                  </select>
                ) : null}
              </div>
            </div>
          </div>
          {/* 訂單摘要 */}
          <div className="col-3 ms-5  ">
            <div className="total-container mb-3  ">
              <div className="total-title">
                <h4>訂單摘要</h4>
              </div>
              <div className="total-content" style={{ height: '170px' }}>
                <ul>
                  <li>
                    <h6>品項數</h6>
                    <span>{cart.length}件</span>
                  </li>
                  <li>
                    <h6>總計</h6>
                    <span>{total}元</span>
                  </li>
                  {coupon.isOpen ? (
                    <li>
                      <h6>優惠券</h6>
                      <span>
                        {coupon.value > 0 ? '-' : null}
                        {coupon.value}
                      </span>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="total-price">
                <h5>總金額</h5>
                <span>{coupon.value > 0 ? total - coupon.value : total}元</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="me-3 mybtnp mybtny--s mybtny--b"
                onClick={() => router.push('/product/list')}
              >
                再去逛逛
              </button>
              <button
                className="mybtny mybtny--m mybtny--b"
                onClick={() => router.push('/cart/payment')}
              >
                下一步
              </button>
            </div>
          </div>
        </div>
        {/* 第二橫排 商品加購 */}
        <div className="row mt-5">
          <div className="p-title">
            <h1>商品加購</h1>
          </div>
          <div className="d-flex justify-content-between">
            {getData.slice(0, 5).map((v, i) => {
              return (
                <ShopCard
                  com={v.company}
                  pid={v.id}
                  key={v.id}
                  file={v.file}
                  price={v.price}
                  name={v.name}
                  type={v.type2}
                />
              )
            })}
          </div>
        </div>
        {/* container end/ */}
      </div>
      {/* 男人牽狗 */}
      <div className="man-dog">
        <img src="/images/product/cart/man-dog.svg" alt="" />
      </div>
    </>
  )
}
