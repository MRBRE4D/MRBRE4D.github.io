import React from 'react'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext)

  // console.log(auth)
  const { id } = auth
  // console.log(auth)

  // 儲存寵物各欄位填入資料用state
  const [data, setData] = useState([])

  useEffect(() => {
    if (auth.isAuth) {
      fetch(`http://localhost:3005/user/getpet?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          // 物件包裝成陣列
          const dataArray = Object.values(data.userData)
          setData(dataArray)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [auth])

  return (
    <>
      <div className="user-illustration-container">
        <img
          src="/images/user/window.svg"
          width={200}
          height={266}
          className="user-illustration"
        />
      </div>
      <img
        src="/images/user/carpet.svg"
        alt="carpet"
        className="user-illustration-carpet"
      />
      <div className="user-index-container">
        {/* header */}
        <div className="user-index-header">
          {/* user大頭照 */}
          <div className="user-avatar-container">
            <img
              src="/images/user/user-avatar.jpg"
              className="user-avatar"
              alt="user-avatar"
            />
          </div>

          {/* user資料 */}
          <div className="user-info-container">
            {/* 文字區 + 徽章 */}
            <div className="user-content">
              {/* 文字區 */}
              <div className="user-detail">
                <h1 className="user-name mb-3">{auth.nickname}</h1>
                <h5 className="user-email mb-3">{auth.email}</h5>
                <h4 className="user-text">
                  <span className="border-left"></span>
                  我有<span className="text-span">{data.length}</span>隻毛孩
                </h4>
              </div>

              {/* 徽章 */}
              <div className="user-medal">
                <img src="/images/user/medal.svg" alt="medal" />
                <img src="/images/user/medal.svg" alt="medal" />
              </div>
            </div>

            {/* 寵物圖片 */}
            <div className="pet-img-container">
            {data.map((v, i) => {
                return (
                  <div className="pet-img-arr" key={v.pet_id}>
                    <h5 className="pet-img-arr-name">{v.pet_name}</h5>
                    {v.vari_id == 0 ? (
                      <img
                        src={`/images/user/pet-data-01.svg`}
                        alt={v.pet_name}
                      />
                    ) : v.vari_id == 1 ? (
                      <img
                        src={`/images/user/pet-data-02.svg`}
                        alt={v.pet_name}
                      />
                    ) : null}
                  </div>
                )
              })}
              {/* <div className="pet-img-arr">
                <h5 className="pet-img-arr-name">窩窩</h5>
                <img src="/images/user/pet-data-01.svg" alt="窩窩" />
              </div>
              <div className="pet-img-arr">
                <h5 className="pet-img-arr-name">浩呆</h5>
                <img src="/images/user/pet-data-02.svg" alt="浩呆" />
              </div>
              <div className="pet-img-arr">
                <h5 className="pet-img-arr-name">阿修</h5>
                <img src="/images/user/pet-data-03.svg" alt="阿修" />
              </div>
              <div className="pet-img-arr">
                <h5 className="pet-img-arr-name">叡叡</h5>
                <img src="/images/user/pet-data-04.svg" alt="叡叡" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
