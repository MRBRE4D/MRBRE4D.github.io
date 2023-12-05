import React from 'react'
import Link from 'next/link'
import styles from './stray-card.module.scss'

export default function StrayCard({
  i,
  name,
  nickName,
  varietyName,
  color,
  healthy,
  age,
  shelter,
  img,
  backgroundStory,
  gender,
}) {
  return (
    <>
      <div className={styles.cardTop}>
        <img
          className={styles.cardImg}
          src={`/images/stray/${img}`}
          alt="pudding-dog"
          width="172"
          height="172"
        />
        <h5>
          <div className={styles.strayNickName}>{nickName}</div>
        </h5>
      </div>
      <div className={styles.cardIntroduce}>
        <div className={styles.cardIntroduceText}>
          <h3>{name}</h3>
          <h4>
            {age}歲 | {gender == 'male' ? '男孩' : '女孩'} | {varietyName}
          </h4>
          <h6>{shelter}</h6>
        </div>
        <Link href={`/stray/${i}`}>
          <button className={styles.cardIntroduceBtn}>了解更多</button>
          {/* className="mybtny mybtny--s mybtny--e" */}
          {/* styles.cardIntroduceBtn */}
        </Link>
      </div>
    </>
  )
}
