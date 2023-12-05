import { useContext } from 'react'
import { CartContext } from '@/hooks/use-cart'
import ToggleBtn from '@/components/product/toggleBtn'
import ShopCard from '@/components/product/shopCard'

import {
  removeFromCart,
  decrementItemQuantity,
  clearCart,
} from '@/hooks/cart-reducer'

export default function Indexx() {

  const { cart, dispatch } = useContext(CartContext)

  const pdemo = [
    {
      id: 1,
      img: '/images/product/card/product-1.webp',
      title: '猫用 FANTASTIC 98% 鮮肉無膠主食罐',
      price: 72,
      amount: 3,
      total: 72 * 3,
    },
    {
      id: 2,
      img: '/images/product/card/product-2.jpg',
      title: 'MediMousse聯合支援貓咪單品快遞配送',
      price: 55,
      amount: 2,
      total: 55 * 2,
    },
  ]
  return (
    <>
      <div className="container">
        {/* 步驟 */}
        <div className="step-bar ">
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
        <div className="cart-dog">
          <img src="/images/product/cart/lay-dog.svg" alt="" />
        </div>
        {/* 第一橫排 */}
        <div className="row mt-5">
          {/* 商品列表 */}
          <div className="col-8 ">
            <div className="row">
              <div className="col-12">
                <table className="table table-secondary">
                  <thead>
                    <tr>
                      <th>圖片</th>
                      <th>商品</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th>小計</th>
                      <th>
                        <a>全部刪除</a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdemo.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <img className="pimg" src={v.img} alt="" />
                          </td>
                          <td>
                            <h6>{v.title}</h6>
                          </td>
                          <td>
                            <h5>{v.price}</h5>
                          </td>
                          <td>
                            <div className="counter">
                              <button>
                                <i className="fa-solid fa-minus fa-2xs"></i>
                              </button>
                              <div className="num">{v.amount}</div>
                              <button>
                                <i className="fa-solid fa-plus fa-2xs"></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <h5>{v.total}</h5>
                          </td>
                          <td>
                            <i className="bi bi-trash trash"></i>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <span>優惠券</span>
              <ToggleBtn />
            </div>
          </div>
          {/* 訂單摘要 */}
          <div className="col-4 p-0 m-0">
            <div className="total-container">
              <div className="total-title">
                <h5>訂單摘要</h5>
              </div>
              <div className="total-content">
                <ul>
                  <li>
                    <h6>總計</h6>
                    <span>$867</span>
                  </li>
                  <li>
                    <h6>運費</h6>
                    <span>$60</span>
                  </li>
                  <li>
                    <h6>優惠券</h6>
                    <span>-100</span>
                  </li>
                </ul>
              </div>
              <div className="total-price">
                <h5>總金額</h5>
                <span>$767</span>
              </div>
            </div>
            <button className="cart-btn">再去逛逛</button>
            <button className="cart-btn">確認付款</button>
          </div>
        </div>
        {/* 第二橫排 商品加購 */}
        <div className="row mt-5">
          <ShopCard title="商品加購" amount={6} />
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
