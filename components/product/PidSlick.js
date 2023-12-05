import React from 'react'
import Slider from 'react-slick'
import '@/node_modules/slick-carousel/slick/slick.css'
import '@/node_modules/slick-carousel/slick/slick-theme.css'

export default function PidSlick({ Pimgs }) {
  // ['can-01-1.webp','can-01-2.webp',...]
  const imgUrl = '/images/product/pid/'
  const images = Pimgs.map((img, i) => {
    return {
      id: i + 1,
      src: `${imgUrl + img}`,
      alt: `Image ${i + 1}`,
    }
  })
  console.log(images)
  // const images = [
  //   {
  //     id: 1,
  //     src: `${imgUrl}/can-01-1.webp`,
  //     alt: 'Image 1',
  //   },
  //   {
  //     id: 2,
  //     src: `${imgUrl}/can-01-2.webp`,
  //     alt: 'Image 2 ',
  //   },
  //   {
  //     id: 3,
  //     src: `${imgUrl}/can-01-3.webp`,
  //     alt: 'Image 3',
  //   },
  //   {
  //     id: 4,
  //     src: `${imgUrl}/can-01-4.webp`,
  //     alt: 'Image 4',
  //   },
  //   {
  //     id: 5,
  //     src: `${imgUrl}/can-01-5.webp`,
  //     alt: 'Image 5',
  //   },
  // ]
  const settings = {
    customPaging: function (i) {
      return (
        // 小張的
        <img src={imgUrl + Pimgs[i]} alt="" />
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
        {images.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.src} alt={item.alt} />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
