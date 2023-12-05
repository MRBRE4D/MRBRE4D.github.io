import React, { Component } from 'react'
import Slider from 'react-slick'
import '@/node_modules/slick-carousel/slick/slick.css'
import '@/node_modules/slick-carousel/slick/slick-theme.css'

export default function TestCarouselPid2() {
  const baseUrl = '/images/product/pid'

  const images = [
    {
      id: 1,
      src: `${baseUrl}/product-1.webp`,
      alt: 'Image 1',
    },
    {
      id: 2,
      src: `${baseUrl}/product-2.webp`,
      alt: 'Image 2 ',
    },
    {
      id: 3,
      src: `${baseUrl}/product-3.webp`,
      alt: 'Image 3',
    },
    {
      id: 4,
      src: `${baseUrl}/product-4.webp`,
      alt: 'Image 4',
    },
    {
      id: 5,
      src: `${baseUrl}/product-5.webp`,
      alt: 'Image 5',
    },
  ];
  console.log(images)
  
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={baseUrl + `/product-${i + 1}.webp`} alt="" />
        </a>
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <>
      <div>
        <h2>Custom Paging</h2>
      </div>
      <div>
        <Slider {...settings}>
          {/* {images.map((item) => {
            ;<div key={item.id}>
              <img src={baseUrl + '/product-{item.id}.webp'}  alt={item.alt} />
            </div>
          })} */}

          <div>
            <img src={baseUrl + '/product-1.webp'} />
          </div>
          <div>
            <img src={baseUrl + '/product-2.webp'} />
          </div>
          <div>
            <img src={baseUrl + '/product-3.webp'} />
          </div>
          <div>
            <img src={baseUrl + '/product-4.webp'} />
          </div>
          <div>
            <img src={baseUrl + '/product-5.webp'} />
          </div>
        </Slider>
      </div>
    </>
  )
}
