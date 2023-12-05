import React, { Component } from 'react'
import Slider from 'react-slick'
import '@/node_modules/slick-carousel/slick/slick.css'
import '@/node_modules/slick-carousel/slick/slick-theme.css'
import styles from '../carouselPid.module.scss'

export default function TestCarouselPid() {
  const imgUrl = '/images/product/pid'
  const settings = {
    customPaging: function (i) {
      return (
        // 小張的
        <img src={imgUrl + `/product-${i + 1}.webp`} className="nimg" alt="" />
      )
    },
    // 大的父容器
    className: 'slick-father',
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    //最外面
    <div className="slick-space">
      {/* 大張的 */}
      <Slider {...settings}>
        <div>
          <img src={imgUrl + '/product-1.webp'} />
        </div>
        <div>
          <img src={imgUrl + '/product-2.webp'} />
        </div>
        <div>
          <img src={imgUrl + '/product-3.webp'} />
        </div>
        <div>
          <img src={imgUrl + '/product-4.webp'} />
        </div>
        <div>
          <img src={imgUrl + '/product-5.webp'} />
        </div>
      </Slider>
    </div>
  )
}
