import React, { useState } from 'react'

import styles from './sortBar.module.scss'

export default function SortBar({ data, orderBy }) {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>商品列表</h3>
        </div>
        <div className={styles.sortbar}>
          <div className={styles.amount}>
            <h6>
              共 <span className={styles.num}>{data.length}</span> 件商品
            </h6>
          </div>
          <div className={styles.sortBtn}>
            <span>排序:</span>
            <select
              name="sort"
              id="sort"
              onChange={(e) => {
                orderBy(e.target.value)
              }}
              className={styles.sortSelect}
            >
              <option value="DESC">價格高到低</option>
              <option value="ASC">價格低到高</option>
              <option value="COM">依廠商名</option>
              <option value="PRO">依商品名</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
