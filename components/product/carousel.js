import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function Carousel() {
  return (
    <>
      <Swiper
        //同時出現張數
        slidesPerView={'1.5'}
        // 圖片間距
        spaceBetween={20}
        //最後會重頭
        rewind={true}
        // 左右箭頭
        navigation={true}
        // 小點點
        pagination={{
          clickable: true,
        }}
        // 正在看的圖片設在中間
        centeredSlides={true}
        // 自動播放
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        // loopAdditionalSlides={1}
        modules={[Autoplay, Navigation, Pagination]}
        //RWD斷點
        // breakpoints={{
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        //   1024: {
        //     slidesPerView: 5,
        //     spaceBetween: 50,
        //   },
        // }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/product/index/carousel1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/product/index/carousel2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/product/index/carousel3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/product/index/carousel1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/product/index/carousel2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/product/index/carousel3.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
