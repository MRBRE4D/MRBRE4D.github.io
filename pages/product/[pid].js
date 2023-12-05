import { useContext, useEffect, useState } from 'react'
import FliterBar from '@/components/product/filterbar'
import PriceCounter from '@/components/product/priceCounter'
import ShopCard from '@/components/product/shopCard'
import PidSlick from '@/components/product/PidSlick'
import Swal from 'sweetalert2'

import { useRouter } from 'next/router'
import ProductContext from '@/hooks/product-fetch'
import { CartContext } from '@/hooks/use-cart'
import { addToCart } from '@/hooks/cart-reducer'
import { FacebookShareButton, FacebookIcon } from 'next-share'
import { LineShareButton, LineIcon } from 'next-share'
import { TwitterShareButton, TwitterIcon } from 'next-share'

export default function Detail() {
  const router = useRouter()
  const getData = useContext(ProductContext)
  // 接到計數器的數字丟進購物車測試  失敗
  // const [counterCount, setCounterCount] = useState(0)

  // 接到fetch所有資料的Context
  const allProducts = useContext(ProductContext)

  // 動態路由
  const { pid } = router.query

  // 使用 dispatch 跟reducer 構通(執行動作)
  const { dispatch } = useContext(CartContext)

  // 增加該商品到 localStorage
  const addToCartHandler = (product) => {
    dispatch(addToCart(product))
  }
  // console.log('counterCount-------------')
  // console.log(counterCount)
  const data = allProducts.find((item) => item.id == Number(pid))
  const typeData = getData.filter((v) => {
    return v.type2 == data.type2
  })
  const normalData = getData.filter((v) => {
    return v.type2 !== '寵物禮儀'
  })
  console.log('normalData')
  console.log(normalData)
  //   const [data, setData] = useState([])
  // // array.find(pid) 去找個別資料
  //   const router = useRouter() // 要用useRouter才可以抓到pid
  //   const func = async (pid) => {
  //     const res = await fetch(`http://localhost:3005/product/${pid}`)
  //     console.log(1111)
  //     const jsonData = await res.json()
  //     setData(jsonData[0])
  //   }

  //   useEffect(() => {
  //     if (router.isReady) {
  //       const { pid } = router.query
  //       console.log(22222)
  //       func(pid)
  //     }
  //   }, [router.isReady, router.query]) //router.isReady必加，不然抓不到

  // 商品圖片
  const Pimgs = data?.file?.split(',')

  // 加入購物車成功sweetalert

  const cartAddSuccessHandler = () => {
    Swal.fire({
      toast: true,  
      position: 'top-end',
      icon: 'success',
      width: 300,
      padding: '1rem ',
      timerProgressBar: true,
      title: '加入購物車成功',
      backdrop: false, // 背景黑色關閉
      showConfirmButton: false,
      timer: 1000,
    })
  }
  // 沒有商品

  const errorHandler = () => {
    Swal.fire({
      icon: 'error',
      title: '查無此商品',
      // text: '請確認操作無誤',
      footer: '<a href="/product/list">回到商品列表</a>',
    })
  }
  // 商品內容分段
  const desSplit = data?.des.split('\\n').map((v) => {
    return <>{v ? <p>{v}</p> : <br></br>} </>
  })
  return (
    <>
      {data?.id && (
        <div className="container mt-120">
          <div className="row mb-2">
            {/* 回上一頁 */}
            <div className="col-3  "></div>
            <div className="col-6  ">
              <button
                className=" d-flex  align-items-center mybtnp mybtny--s mybtny--c focus-ring focus-ring-primary"
                onClick={() => router.push(`/product/list`)}
              >
                <i className="fa-solid fa-chevron-left"></i>
                <h6 className="ms-2 m-0">回列表</h6>
              </button>
            </div>
            <div className="col-3 d-flex  justify-content-around">
              <button
                className=" d-flex align-items-center mybtnp mybtny--s mybtny--b focus-ring focus-ring-primary"
                onClick={() =>
                  Number(pid) > 1
                    ? router.push(`/product/${pid - 1}`)
                    : errorHandler()
                }
              >
                <i className="fa-solid fa-chevron-left"></i>
                <h6 className="ms-2 m-0">上一個</h6>
              </button>
              <button
                className=" d-flex  align-items-center mybtnp mybtny--s mybtny--b focus-ring focus-ring-primary"
                onClick={() =>
                  Number(pid) < 53
                    ? router.push(`/product/${Number(pid) + 1}`)
                    : errorHandler()
                }
              >
                <h6 className="me-2 m-0">下一個</h6>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="row">
            {/* 篩選 */}
            <div className="col-3">
              <FliterBar />
            </div>

            <div className="col-9">
              <div className="row mb-5 ">
                {/* 商品照片 */}
                <div className="col-6 ">
                  <PidSlick Pimgs={Pimgs} />
                </div>
                <div className="col-6   ">
                  <div className="row product-right d-flex   align-items-between  ">
                    {/* 廠商+分類 */}
                    <div className="col-12 mb-2 company category">
                      <span className="me-3">{data.company}</span>
                      <span>{data.type2}</span>
                    </div>
                    {/* 名稱 */}
                    <div className="col-12 mb-2 product-title">
                      <h3>{data.name}</h3>
                    </div>
                    {/* 商品描述 */}
                    <div
                      className="col-12  mb-2 product-des"
                      style={{ height: '20rem', overflowY: 'scroll' }}
                    >
                      <p className="text-break  lh-lg">{desSplit}</p>
                    </div>

                    {/* 分享按鈕 */}
                    <div className="col-12 mb-2 fw-bold d-flex justify-content-end align-items-center ">
                      <div className="me-2">分享:</div>
                      <div className="me-2">
                        {' '}
                        <FacebookShareButton
                          url={'https://www.google.com'}
                          quote={`
                          我發現一個很棒的商品，${data.name}只要${data.price}元!`}
                          hashtag={data.name}
                        >
                          <FacebookIcon size={40} round />
                        </FacebookShareButton>
                      </div>
                      <div className="me-2">
                        {' '}
                        <LineShareButton
                          url={`http://localhost:3000/product/${data.id}`}
                          title={`
                        我發現一個很棒的商品，${data.name}只要${data.price}元`}
                        >
                          <LineIcon size={40} round />
                        </LineShareButton>
                      </div>
                      <div className="me-2">
                        <TwitterShareButton
                          url={'https://www.google.com'}
                          title={`
                        我發現一個很棒的商品，${data.name}只要${data.price}元`}
                        >
                          <TwitterIcon size={40} round />
                        </TwitterShareButton>
                      </div>
                    </div>
                    {/* 購買按鈕 */}
                    <div className="col-12 d-flex justify-content-between">
                      <button
                        type="button"
                        className="mybtny mybtny--l mybtny--e"
                        onClick={() => {
                          router.push('/cart')
                          addToCartHandler(data)
                        }}
                      >
                        <i className="bi bi-cart3"></i>
                        {'   '}
                        直接購買
                      </button>
                      <button
                        type="button"
                        className="mybtny mybtny--l mybtny--e"
                        onClick={() => {
                          addToCartHandler(data)
                          cartAddSuccessHandler()
                        }}
                        // className="btn btn-lg bg-primary text-white ps-4 pe-4"
                      >
                        <i className="bi bi-cart3"></i>
                        {'   '}
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5 pid-card">
                {/* 商品推薦 */}
                <div className="col-12 mt-5 mb-5   ">
                  <div className="p-title  ">
                    <h1>相關商品</h1>
                  </div>
                  <div className="d-flex">
                    {typeData.slice(0, 4).map((v) => {
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

                <hr />
                {/* 其他商品 */}
                <div className="col-12 mt-5 mb-5   ">
                  <div className="p-title  ">
                    <h1>其他商品</h1>
                  </div>
                  <div className="d-flex">
                    {' '}
                    {normalData
                      .slice(Math.random() + 36, Math.random() + 40)
                      .map((v) => {
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
