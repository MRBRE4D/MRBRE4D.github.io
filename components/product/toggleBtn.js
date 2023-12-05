import React from 'react'
import styles from './toggleBtn.module.scss'
export default function ToggleBtn() {
  return (
    <>
      <div className="toggle-wrapper">
        <div className="toggle dog-rollover">
          <input id="doggo" type="checkbox" />
          <label className="toggle-item" htmlFor="doggo">
            <div className="dog">
              <div className="ear"></div>
              <div className="ear right"></div>
              <div className="face">
                <div className="eyes"></div>
                <div className="mouth"></div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* <div className={styles.toggleWrapper}>
        <div className={styles.toggle +''+ styles.dogRollover}>
          <input className={styles.input} id="doggo" type="checkbox" />
          <label className={styles.toggleItem} htmlFor="doggo">
            <div className={styles.dog}>
              <div className={styles.ear}></div>
              <div className={styles.ear +''+ styles.right}></div>
              <div className={styles.face}>
                <div className={styles.eyes}></div>
                <div className={styles.mouth}></div>
              </div>
            </div>
          </label>
        </div>
      </div> */}
    </>
  )
}
