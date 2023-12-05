import React from 'react'
import styles from './categoryBtn.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function CategoryBtn() {
  const Hrefs = [
    'product/list?type1=貓',
    'product/list?type1=狗',
    'product/list?type2=貓飼料&狗飼料',
    'product/list?type2=貓罐頭&狗罐頭',
    'product/list?type2=清潔用品',
    'product/list?type2=寵物禮儀',
  ]
  return (
    <>
      <div className={styles.container}>
        {/* 1.貓 */}
        <Link href={Hrefs[0]}>
          <div className={styles.box + ' ' + styles.cat}>
            <div className={styles.text}>
              <h3>猫猫</h3>
              <h5>for cat</h5>
            </div>
            <div className={styles.img}>
              <img src="/images/product/categoryBtn/btn-cat.svg" alt="" />
            </div>
          </div>
        </Link>
        {/* 2.狗 */}
        <Link href={Hrefs[1]}>
          <div className={styles.box + ' ' + styles.dog}>
            <div className={styles.text}>
              <h3>汪汪</h3>
              <h5>for dog</h5>
            </div>
            <div className={styles.img}>
              <img src="/images/product/categoryBtn/btn-dog.svg" alt="" />
            </div>
          </div>
        </Link>

        {/* 3.飼料 */}
        <Link href={Hrefs[2]}>
          <div className={styles.box + ' ' + styles.food}>
            <div className={styles.text}>
              <h3>飼料</h3>
              <h5>feed</h5>
            </div>
            <div className={styles.img}>
              <img src="/images/product/categoryBtn/btn-feed.svg" alt="" />
            </div>
          </div>
        </Link>

        {/* 4.罐頭 */}
        <Link href={Hrefs[3]}>
          <div className={styles.box + ' ' + styles.food}>
            <div className={styles.text}>
              <h3>罐頭</h3>
              <h5>can</h5>
            </div>
            <div className={styles.img}>
              <img src="/images/product/categoryBtn/btn-can.svg" alt="" />
            </div>
          </div>
        </Link>
        {/* 5.清潔 */}
        <Link href={Hrefs[4]}>
          <div className={styles.box + ' ' + styles.cleaning}>
            <div className={styles.text}>
              <h3>寵物清潔</h3>
              <h5>pet cleaning</h5>
            </div>
            <div className={styles.img}>
              <img src="/images/product/categoryBtn/btn-cleaning.svg" alt="" />
            </div>
          </div>
        </Link>
        {/* 6.寵物禮儀 */}
        <Link href={Hrefs[5]}>
          <div className={styles.box + ' ' + styles.med}>
            <div className={styles.text}>
              <h3>寵物禮儀</h3>
              <h5>pet funeral</h5>
            </div>
            <div className={styles.img}>
              <img src="/images/product/categoryBtn/btn-candle.svg" alt="" />
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
