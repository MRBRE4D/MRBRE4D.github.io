import Carousel from '@/components/product/carousel'
import FliterBar from '@/components/product/filterbar'
import CategoryBtn from '@/components/product/categoryBtn'
import ShopCard from '@/components/product/shopCard'
import ProductContext from '@/hooks/product-fetch'
// import App from '@/components/product/test'
import { useContext, useState } from 'react'

// 只作導向到 product/list
export default function ProductIndex() {
  const getData = useContext(ProductContext)
  const comData1 = getData.filter((v, i) => {
    return v.company == 'Royal Canin皇家'
  })
  const comData2 = getData.filter((v, i) => {
    return v.company == '凍物鮮友會'
  })
  const comData3 = getData.filter((v, i) => {
    return v.company == 'CARL卡爾'
  })
  
  return (
    <>
    <div className='mt-120'></div>
      <Carousel />
      <div className="container">
        <div className="row mt-5">
          <div className="col-3">
            <FliterBar />
          </div>
          <div className="col-9">
            <CategoryBtn />
            {/* 第一家 */}
            <div className="row mb-5">
              <div className="p-title  " >
                <h1>Royal Canin皇家</h1>
              </div>
              <div className="d-flex p-cards  ">
                {comData1.slice(0, 4).map((v) => {
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
            {/* 第二家 */}
            <div className="row mb-5">
              <div className="p-title">
                <h1>凍物鮮友會</h1>
              </div>
              <div className="p-cards d-flex   ">
                {comData2.slice(0, 4).map((v) => {
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
          {/* 第三家 */}
            <div className="row mb-5">
              <div className="p-title ">
                <h1>CARL卡爾</h1>
              </div>
              <div className="d-flex p-cards  ">
                {comData3.slice(0, 4).map((v) => {
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
    </>
  )
}
