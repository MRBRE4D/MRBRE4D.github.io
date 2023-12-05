import React from 'react'
import styles from './shopCard.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 商品範例
// import data from '@/data/product/products.json'

export default function ShopCard({ com, pid, file, price, name, type }) {
  const router = useRouter()
  // const { pid } = router.query
  // 首圖
  const FirstPimg = file?.split(',')[0]
  return (
    <>
      <div className={styles.card}>
        <Link href={`/product/${pid}`} className={styles.mylink}>
          <div className={styles.img + ' ' + styles.shadowCard}>
            <img src={`/images/product/pid/${FirstPimg}`} alt="..." />
          </div>
          <div className={styles.text}>
            <div className={styles.smallText}>
              <p className="pf-p">{type}</p>
              <p className="pf-p">{com}</p>
            </div>

            <h6 className="pf-h6">{name}</h6>
          </div>
          <p className="pf-h5">${price}</p>
        </Link>
      </div>
    </>
  )
}
