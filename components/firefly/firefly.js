import React, { useEffect } from 'react'
import styles from './firefly.module.css'

const Fireflies = () => {
  const quantity = 10

  useEffect(() => {
    const createFireflies = () => {
      const container = document.querySelector(`.${styles.fireflies}`)

      if (container) {
        for (let i = 1; i <= quantity; i++) {
          const firefly = document.createElement('div')
          firefly.classList.add(styles.firefly)
          container.appendChild(firefly)
        }
      }
    }

    createFireflies()
  }, [])

  return (
    <div>
      <div className={styles.fireflies}></div>
    </div>
  )
}

export default Fireflies
