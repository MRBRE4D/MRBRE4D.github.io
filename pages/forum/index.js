import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import App from '@/components/page/App'

export default function Index() {
  const [forum, setForum] = useState([])
  const [search, setSearch] = useState([])

  const inputSearchref = useRef(null)

  const getForum = async () => {
    const res = await fetch('http://localhost:3005/forum')
    const data = await res.json()
    setForum(data.result1)
  }

  useEffect(() => {
    getForum()
  }, [])

  // const getSearch = async () => {
  //   const res = await fetch('http://localhost:3005/forum/search')
  //   const datah = await res.json()
  //   setSearch(data)
  // }
  // useEffect(() => {
  // }, [])

  const searchbtn = () => {
    inputSearchref.current.value
  }

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <div className="forum-total-container">
          <ul className="push-ma">
            <Link className="push-a" href={`/forum/`}>
              <li className="push">貓貓論壇</li>
            </Link>
            <Link className="push-a" href="/">
              <li className="push">狗狗論壇</li>
            </Link>
            <Link className="push-a" href="/">
              <li className="push">醫療論壇</li>
            </Link>
          </ul>
          <Link href="/forum/post" className="push-post-a">
            <button className="push-post">發文</button>
          </Link>
        </div>
        <div className="container-forum">
          {/* {forum?.map((v, i) => {
            if (i < 3) {
              return (
                <Link
                  href={`/forum/${v?.art_id}`}
                  className="card-forum"
                  key={i}
                >
                  <div className="card-forum-img-container">
                    <img src={`/images/cat-forum/${v?.file}`} alt="" />
                  </div>
                  <div className="card-forum-data">
                    <div className="card-forum-date">
                      {v?.art_date.substr(0, 10)}
                    </div>
                    <div className="card-forum-user">
                      <div className="card-forum-user-img">
                        <img src={`/images/cat-forum/${v?.u_img}`} alt="" />
                      </div>
                      <div className="card-forum-user-name">{v.u_name}</div>
                    </div>
                    <div className="card-forum-title">{v.art_title}</div>
                  </div>
                </Link>
              )
            }
          })} */}
          <Link href="/forum/1" className="card-forum">
            <div className="card-forum-img-container">
              <img src="/images/cat-forum/20-1-1.jpg" alt="" />
            </div>
            <div className="card-forum-data">
              <div className="card-forum-date">2023-10-24</div>
              <div className="card-forum-user">
                <div className="card-forum-user-img">
                  <img src="/images/cat-forum/user20.jpeg" alt="" />
                </div>
                <div className="card-forum-user-name">貓奴</div>
              </div>
              <div className="card-forum-title">你在拍照嗎？請稍等一下</div>
            </div>
          </Link>
          <Link href="/forum/2" className="card-forum">
            <div className="card-forum-img-container">
              <img src="/images/cat-forum/11-1-1.jpg" alt="" />
            </div>
            <div className="card-forum-data">
              <div className="card-forum-date">2023-10-24</div>
              <div className="card-forum-user">
                <div className="card-forum-user-img">
                  <img src="/images/cat-forum/user11.jpeg" alt="" />
                </div>
                <div className="card-forum-user-name">小詩</div>
              </div>
              <div className="card-forum-title">早安喵~</div>
            </div>
          </Link>
          <Link href="/forum/6" className="card-forum">
            <div className="card-forum-img-container">
              <img src="/images/cat-forum/17-1-1.jpg" alt="" />
            </div>
            <div className="card-forum-data">
              <div className="card-forum-date">2023-10-24</div>
              <div className="card-forum-user">
                <div className="card-forum-user-img">
                  <img src="/images/cat-forum/user17.jpeg" alt="" />
                </div>
                <div className="card-forum-user-name">香草</div>
              </div>
              <div className="card-forum-title">難得坐著~</div>
            </div>
          </Link>
        </div>
        <div className="container-forum-search">
          <img
            src="forum/cat-left.svg"
            className="container-forum-search-cat"
            alt=""
          />
          <div className="block-search">
            <input
              className="search-forum"
              type="text"
              name="search"
              id="search"
              placeholder="輸入查詢內容"
              ref={inputSearchref}
            />
          </div>
          <img
            src="forum/dog-rig.svg"
            className="container-forum-search-dog"
            alt=""
          />
        </div>
        <App />
      </div>
    </>
  )
}
