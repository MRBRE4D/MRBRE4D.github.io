import React, { useState } from 'react'
import styles from '../carouselPid.module.scss'


import "@/node_modules/slick-carousel/slick/slick.css"; 
import "@/node_modules/slick-carousel/slick/slick-theme.css";

const thumbsSample = [
  '/images/product/pid/product-2.webp',
  '/images/product/pid/product-1.webp',
  '/images/product/pid/product-3.webp',
  '/images/product/pid/product-4.webp',
  '/images/product/pid/product-5.webp',
]

const imgsSample = [
  '/images/product/pid/product-2.webp',
  '/images/product/pid/product-1.webp',
  '/images/product/pid/product-3.webp',
  '/images/product/pid/product-4.webp',
  '/images/product/pid/product-5.webp',
]

export default function CarouselPid() {
  const [thumbs, setThumbs] = useState(thumbsSample)
  const [imgs, setImgs] = useState(imgsSample)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          {imgs.map((v, i) => {
            return (
              <div
                key={v + i}
                className={`${styles.item} ${i === 0 ? 'active' : ''}`}
              >
                <img src={v} alt={v} className={styles.img} />
              </div>
            )
          })}
        </div>
        <div>
          <ul className={styles.thumbnails}>
            {thumbs.map((v, i) => {
              return (
                <li key={i}>
                  <a href="">
                    <img src={v} alt={v} className={styles.nimg} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
