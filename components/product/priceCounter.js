import React, { useEffect, useState } from 'react'
import styles from './priceCounter.module.scss'
import { useRouter } from 'next/router'

export default function PriceCounter({
  // counterCount,  // 本來想一次增加多筆產品
  // setCounterCount,
  deleteHandler,
  item,
  quantity,
  addToCartHandler,
  removeFromCartHandler,
  decrementQuantity,
}) {
  const router = useRouter()
  const pathname = router.pathname
  console.log('pathname')
  console.log(pathname)

  const [count, setCount] = useState(0)
  // 增加
  const increase = () => {
    setCount(count + 1)
  }
  // 減少

  const decrease = () => {
    setCount((prevCount) => {
      // 不能小於0
      if (prevCount <= 0) return 0
      return prevCount - 1
    })
  }
  return (
    <>
      <div className={styles.counter}>
        <button
          onClick={() => {
            {
              pathname == '/cart'
                ? item.quantity == 1
                  ? deleteHandler(item)
                  : decrementQuantity(item)
                : decrease()
            }
          }}
        >
          &minus;
        </button>
        <div id="value" className={styles.num}>
          {pathname == '/cart' ? quantity : count}
          {/* {quantity} */}
        </div>
        <button
          onClick={() => {
            {
              pathname == '/cart' ? addToCartHandler(item) : increase()
            }
            // addToCartHandler(item)
          }}
        >
          &#43;
        </button>
      </div>
    </>
  )
}
