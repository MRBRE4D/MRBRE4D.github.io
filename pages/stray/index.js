import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import StrayCard from '@/components/stray/stray-card'
import CountUp from 'react-countup'
import Pagination from '@/components/strayPages/pagination'
import Websocket from '@/components/websocket/websocket'

export default function Stray() {
  // const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(8)
  const [type, setType] = useState({})
  const [colorId, setColorId] = useState('')

  // const getStrayCard = () => {
  //   console.log("123456");
  //   fetch('http://localhost:3005/stray')
  //   .then((res) =>  res.json() )
  //   .then((data) => console.log(data))
  // }
  // 取得寵物全部
  const getStrayCard = async () => {
    let query = ''
    if (colorId) {
      query += `?colorId=${colorId}`
    }
    const res = await fetch(`http://localhost:3005/stray${query}`)

    const data = await res.json()

    setData(data)
  }
  useEffect(() => {
    getStrayCard()
  }, [colorId])

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  const currentPosts = data?.slice(firstPostIndex, lastPostIndex)

  const totalImg = Math.ceil(Math.random() * data?.length)

  return (
    <>
      <div className="container-fluid circulor">
        <div className='webMessage'><Websocket/></div>
        <div className="text text-left">
          <h2>還有</h2>
          <h1>
            <CountUp end={1177} />隻
          </h1>
          <h2>想要一個家</h2>
        </div>
        <div className="mugImgContainer">
          {data?.map((v, i) => {
            if (v.strayId == totalImg) {
              return (
                <img
                  key={i}
                  className="mugImg"
                  src={`/images/stray/${v.strayImg}`}
                  alt="pudding-dog"
                  width="480"
                  height="480"
                />
              )
            }
          })}
        </div>
        <div className="text text-right">
          <h2>已經</h2>
          <h1>
            <CountUp end={109} />隻
          </h1>
          <h2>找到伴旅</h2>
        </div>
      </div>
      <div className="strayContent">
        <div className="straySearch">
          <div className="block-search-stray w-100">
            <input
              type="text"
              className="search-event-stray"
              placeholder="搜尋毛孩名字"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="searchText">
            <h4>尋找毛孩</h4>
          </div>
          <div className="strayType">
            <h5>種類</h5>
            <div className="strayIcon">
              <img

                src="/images/stray/check-vari_dog.svg"
                width={40}
                height={40}
              />
              <img        
   
                src="/images/stray/check-vari_cat.svg"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div>
            <h5>體型</h5>
            <div className="strayBody">
              <h5>
                <input
                  className="radioType"
                  type="radio"
                  name="size"
                  value={1}
                />{' '}
                小
              </h5>
              <h5>
                <input
                  className="radioType"
                  type="radio"
                  name="size"
                  value={2}
                />{' '}
                中
              </h5>
              <h5>
                <input
                  className="radioType"
                  type="radio"
                  name="size"
                  value={3}
                />{' '}
                大
              </h5>
            </div>
          </div>
          <div className="breed">
            <h5>品種</h5>
            <select name="breed" id="breed" className="breed">
              <option value="">請選擇</option>
              <option value="labrador">拉不拉多</option>
              <option value="golden">黃金獵犬</option>
              <option value="corgi">柯基</option>
              <option value="pomeranian">博美狗</option>
              <option value="mix">米克斯</option>
            </select>
          </div>
          <div className="strayColor">
            <h5>顏色</h5>
            <div className="strayColor">
              <select
                name="color"
                id="color"
                onChange={(e) => {
                  setColorId(e.target.value)
                }}
              >
                <option value="">請選擇</option>
                <option value="1">黑色</option>
                <option value="2">白色</option>
                <option value="3">灰色</option>
                <option value="4">黃色</option>
                <option value="5">橘色</option>
              </select>
            </div>
          </div>
          <div className="searchText mt-2">
            <h4>所在地區</h4>
          </div>
          <div className="rangeAll">
            <h5>範圍</h5>
            <div className="range">
              <h5>
                <input
                  className="radioType"
                  type="radio"
                  name="range"
                  value={1}
                />{' '}北部</h5>
              <h5>
                <input
                  className="radioType"
                  type="radio"
                  name="range"
                  value={2}
                />{' '}中部</h5>
              <h5>
                <input
                  className="radioType"
                  type="radio"
                  name="range"
                  value={3}
                />{' '}南部</h5>
            </div>
          </div>
          <div className="region">
            <div className="countyText">
              <h5>縣市</h5>
              <div className="county">
                <select name="color" id="color">
                  <option value="">請選擇</option>
                  <option value="1">台北市</option>
                  <option value="2">新北市</option>
                  <option value="3">桃園市</option>
                  <option value="4">宜蘭縣</option>
                  <option value="5">新竹市</option>
                </select>
              </div>
            </div>
            <div className="areaText">
              <h5>區域</h5>
              <div className="area">
                <select name="color" id="color">
                  <option value="">請選擇</option>
                  <option value="1">永和區</option>
                  <option value="2">中和區</option>
                  <option value="3">中正區</option>
                  <option value="4">萬芳區</option>
                  <option value="5">大安區</option>
                </select>
              </div>
            </div>
          </div>
            <img className="filter-stray" src="/images/stray/fliter.svg" alt="" />
        </div>
        <div className="cardAll">
          <ul className="cardList">
            {currentPosts?.map((v, i) => {
              return (
                <div
                  className="card"
                  style={{ borderWidth: 0 }}
                  key={v.strayId}
                >
                  <StrayCard
                    i={v.strayId}
                    name={v.name}
                    nickName={v.nickName}
                    varietyName={v.vari_name}
                    color={v.color_name}
                    healthy={v.healthy}
                    age={v.age}
                    shelter={v.she_name}
                    img={v.strayImg}
                    backgroundStory={v.backgroundStory}
                    gender={v.gender}
                  />
                </div>
              )
            })}
          </ul>
        </div>
      </div>
      <Pagination
        totalPosts={data?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}
