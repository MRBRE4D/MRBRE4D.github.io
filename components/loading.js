import React from 'react'
import styles from './loading.module.scss'

export default function Loading() {
  return (
    <>
    <div className={styles.loadingContainer}>
      <div className={styles.dog}>
        <div className={styles.dogBody}>
          <div className={styles.dogTail}>
            <div className={styles.dogTail}>
              <div className={styles.dogTail}>
                <div className={styles.dogTail}>
                  <div className={styles.dogTail}>
                    <div className={styles.dogTail}>
                      <div className={styles.dogTail}>
                        <div className={styles.dogTail}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dogTorso}></div>
        <div className={styles.dogHead}>
          <div className={styles.dogEars}>
            <div className={styles.dogEar}></div>
            <div className={styles.dogEar}></div>
          </div>
          <div className={styles.dogEyes}>
            <div className={styles.dogEye}></div>
            <div className={styles.dogEye}></div>
          </div>
          <div className={styles.dogMuzzle}>
            <div className={styles.dogTongue}></div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
