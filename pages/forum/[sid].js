import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState, useContext, useRef } from 'react'
import { BsFillEyeFill } from 'react-icons/bs'
import { ImBubble } from 'react-icons/im'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { BiSolidLike } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import AuthContext from '@/context/AuthContext'

export default function Article() {
  const router = useRouter()
  const [forum, setForum] = useState([])
  const [forums, setForums] = useState([])
  const [fans, setFans] = useState([])
  const [forumListAll, setForumListAll] = useState([])
  const [contentImg, setContentImg] = useState([])
  const [reply, setReply] = useState([])
  const { auth, setAuth } = useContext(AuthContext)
  const [replyContent, setReplyContent] = useState('')
  const [good, setGood] = useState([])
  const [goodCount, setGoodCount] = useState('')
  const [replyCount, setReplyCount] = useState('')
  const [error, setError] = useState('')
  const [tryfan, setTryFan] = useState('')

  const { id } = auth
  // console.log('id: ', id)

  //取單個文章
  const getForum = async (sid) => {
    const res = await fetch(`http://localhost:3005/forum/${sid}`)
    const data = await res.json()
    setForum(data)
  }
  useEffect(() => {
    if (router.isReady) {
      // console.log('router query: ', router.query)
      const { sid } = router.query
      getForum(sid)
    }
  }, [router.isReady, router.query])

  //取全部user的發文list OK
  const getForumListAll = async (sid) => {
    const res = await fetch(`http://localhost:3005/forum/`)
    const data = await res.json()
    setForumListAll(data.result1)
  }
  useEffect(() => {
    getForumListAll()
  }, [])

  //抓文章回覆內容
  const getreply = async (sid) => {
    'attempting to get reply'
    const res = await fetch(`http://localhost:3005/forum/reply${sid}`)
    const data = await res.json()
    // console.log(data)
    setReply(data.result1)
    // console.log(data.result2[0].count);
    setReplyCount(data.result2[0].count)
  }
  // console.log(reply)

  //抓sid的所有的資料
  const getForums = async (sid) => {
    const res = await fetch(`http://localhost:3005/forum/all${sid}`)
    const data = await res.json()
    setForums(data)
  }

  //抓追蹤者用
  const getFans = async (sid) => {
    const res = await fetch(`http://localhost:3005/forum/fans${sid}`)
    const data = await res.json()
    setFans(data)
  }
  // useEffect(() => { getFans() }, [tryfan, router.isReady])

  const getContentImg = async (sid) => {
    const res = await fetch(`http://localhost:3005/forum/content${sid}`)
    const data = await res.json()
    setContentImg(data)
  }

  const replybtn = async (e) => {
    if (replyContent === '') {
      setError('請輸入內容...')
    } else {
      setError('')
    }
    const { sid } = router.isReady
    const res = await axios.post('http://localhost:3005/forum/reply', {
      id: id,
      content: replyContent,
      art_id: forum[0].art_id,
    })
    setReply(res.data)
    setReplyContent('')
  }
  // console.log(forum[0]);

  const fansbtnHandler = async (e) => {
    const res = await axios.post('http://localhost:3005/forum/isfans', {
      id: id,
      u_id: forum[0].u_id,
    })
    // console.log('tryfans');
    // console.log(res.data);
    // console.log(res);
    setTryFan(res.data)
  }

  const getGood = async (sid) => {
    const res = await fetch(`http://localhost:3005/forum/good${sid}`)
    const data = await res.json()
    // console.log(data)
    // console.log(data.result1)
    // console.log(data.result2[0].count)
    setGood(data.result1)
    setGoodCount(data.result2[0].count)
  }

  // console.log(good)
  const isGood = async () => {
    const { sid } = router.query
    // const getcatisVaile = good[0] === undefined ? 0 : good[0].cat_isVaild
    const res = await axios.post('http://localhost:3005/forum/good', {
      id: id,
      art_id: forum[0].art_id,
      isVaile: good,
    })
    // console.log(good)
    // console.log('what is the count now')
    // console.log(res.data.count)
    setGoodCount(res.data.count)
    getGood(sid)
  }

  useEffect(() => {
    if (router.isReady) {
      const { sid } = router.query
      getreply(sid)
      setReplyCount(sid)
      getForums(sid)
      getFans(sid)
      getContentImg(sid)
      getGood(sid)
      setGoodCount(sid)
    }
  }, [router.isReady, router.query])

  useEffect(() => {
    if (router.isReady) {
      const { sid } = router.query
      getFans(sid)
      getreply(sid)
    }
  }, [tryfan, reply])
  // reply
  // console.log(fans);
  function createMarkup() {
    return { __html: `${forum[0].art_content}` }
  }
  // console.log('----------------------------------------replyCount');
  // console.log(replyCount);

  return (
    <>
      {forum[0]?.art_id && (
        <div className="article-background">
          <div className="article-container">
            <div className="article-container-main">
              <div>
                <h1 className="article-main-title">{forum[0]?.art_title}</h1>
                <div className="article-main-top d-flex justify-content-between align-items-end ">
                  <div className="article-main-top-auth d-flex ">
                    <Link href="/">
                      <div className="article-main-auth-img">
                        <img
                          alt=""
                          src={`/images/cat-forum/${forum[0]?.u_img}`}
                        />
                      </div>
                    </Link>
                    <div className="me-2">
                      <Link className="tdn" href="/">
                        {forum[0]?.u_name}
                      </Link>
                      <div className="article-main-auth-data">
                        {forum[0]?.art_date
                          .replace('T', ' ')
                          .replace('.000Z', '')}
                      </div>
                    </div>
                    <div className="article-main-auth-tool">
                      <div className="article-main-auth-tool-btn"></div>
                      <div className="article-main-auth-tool-btn">
                        <div>
                          <ImBubble /> {replyCount}
                        </div>
                      </div>
                      <div className="article-main-auth-tool-btn">
                        <div>
                          <BiSolidLike />
                          {goodCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="article-main-top-btn">
                    {id == forum[0].u_id ? (
                      ''
                    ) : (
                      <button
                        className="mybtny mybtny--s mybtny--c article-btn me-2"
                        onClick={() => fansbtnHandler()}
                      >
                        {tryfan == 1 ? '已追蹤' : '追蹤'}
                      </button>
                    )}
                    {id == forum[0].u_id ? (
                      <button className="mybtny mybtny--s mybtny--c article-btn">
                        編輯
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div>
                  <p>
                    {contentImg?.map((v, i) => {
                      return (
                        <div className="article-body-img" key={i}>
                          {/* <img src={`/images/cat-forum/${v?.file}`} alt="" /> */}
                        </div>
                      )
                    })}

                    <p dangerouslySetInnerHTML={createMarkup()}></p>
                    {/* <div className="article-body-img">
                      <img src={`/images/cat-forum/${tt[0]}`} alt="" />
                    </div>

                    <p>{tt[1]}</p>
                    <div className="article-body-img">
                      <img src={`/images/cat-forum/${tt[2]}`} alt="" />
                    </div> */}
                  </p>
                </div>
                <div className="article-body-tool">
                  <button
                    className={
                      'article-body-tool-push' +
                      (good.gid == id && good.cat_isVaild == 1 ? ' coolor' : '')
                    }
                    onClick={isGood}
                  >
                    <BiSolidLike /> 讚
                  </button>
                </div>
                <div className="reply-container">
                  <div className="reply-block">
                    <div className="guide-title">
                      <div className="guide-icon">
                        <IoChatbubbleEllipsesSharp />
                      </div>
                      <p className="guide-btn">評論指南</p>
                    </div>

                    <textarea
                      // ref={replycontentRef}
                      className="form-control reply-textarea"
                      name="replt"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <button
                      onClick={() => replybtn()}
                      className="mybtny mybtny--s mybtny--e art-btn"
                    >
                      評論送出
                    </button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </div>
                  <div className="user-reply">
                    <div>
                      {reply?.map((v, i) => {
                        return (
                          <div className="flex mb-50 " key={i}>
                            <div className="article-main-top-auth d-flex ">
                              <Link href="/">
                                <div className="article-main-auth-img">
                                  <img
                                    alt=""
                                    src={`/images/cat-forum/${v?.u_img}`}
                                  />
                                </div>
                              </Link>
                              <div className="me-2">
                                <Link className="tdn" href="/">
                                  {v?.u_name}
                                </Link>
                                <div className="article-main-auth-data">
                                  {v?.reply_date
                                    .replace('T', ' ')
                                    .replace('.000Z', '')}
                                </div>
                              </div>
                              <div className="article-main-auth-tool">
                                <div className="article-main-auth-tool-btn"></div>
                              </div>
                            </div>
                            <div className="pr-30 "></div>
                            <p className="mb4p">
                              <span className="cmtTxt">{v?.reply_content}</span>
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="article-container-user">
              <div className="article-user-box">
                <Link className="article-user-box-name" href="/">
                  <div className="article-user-img">
                    <img src="/forum/cat4.jpg" alt="" />
                  </div>
                  <h4 className="article-user-name">{forums[0]?.u_name}</h4>
                </Link>

                <div className="article-container-user-tool">
                  <div>
                    <h6 className="article-user-title">
                      {forum[0]?.u_name}的小夥伴
                    </h6>
                    <div className="article-block-user-box">
                      {forum.map((v, i) => {
                        return (
                          <div key={i}>
                            <Link href="/" className="article-user-friend-info">
                              <div className="article-user-friend-img">
                                <img
                                  src={`/images/cat-forum/${v.pet_photo}`}
                                  alt=""
                                />
                              </div>
                              <h6 className="article-user-friend-name">
                                {forum[0]?.pet_name}
                              </h6>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <h6 className="article-user-title">追蹤者</h6>
                    <div className="article-block-user-box">
                      <div className="d-flex justify-content-start">
                        {fans?.map((v, i) => {
                          if (i < 4)
                            return (
                              <Link
                                name="isfans"
                                href="/"
                                className="article-user-friend-info"
                                key={i}
                              >
                                <div className="article-user-friend-img">
                                  <img
                                    src={`/images/cat-forum/${v?.u_img}`}
                                    alt=""
                                  />
                                </div>
                              </Link>
                            )
                        })}
                      </div>
                      {fans.length > 4 ? (
                        <button
                          className="article-user-btn mybtny mybtny--s mybtny--c"
                          href="/"
                        >
                          查看更多
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <h5 className="article-user-tool-title">
                  {forum[0]?.u_name}的所有發文
                </h5>
                <div className="user-pet-photo">
                  {forums?.map((v, i) => {
                    if (i < 6)
                      return (
                        <div className="user-pet-photo-item" key={i}>
                          <Link href={`/forum/${v?.art_id}`}>
                            <img
                              style={{
                                width: '126.3px',
                                height: '126.3px',
                                objectFit: 'cover',
                                overflow: 'hidden',
                              }}
                              src={`/images/cat-forum/${v.file}`}
                              alt=""
                            ></img>
                          </Link>
                        </div>
                      )
                  })}
                </div>
                <div className="article-user-btn">
                  {/* <h5>查看更多</h5> */}
                </div>
              </div>
              <div className="new-post">
                <h3 className=" new-post-tit ">最新文章</h3>
                <div className="user-pet-photo pp ">
                  {forumListAll.map((v, i) => {
                    if (i < 8)
                      return (
                        <div className="user-pet-photo-item" key={i}>
                          <Link href={`/forum/${v.art_id}`}>
                            <img
                              style={{
                                width: '130px',
                                height: '130px',
                                objectFit: 'cover',
                                overflow: 'hidden',
                              }}
                              src={`/images/cat-forum/${v.file}`}
                              alt=""
                            ></img>
                          </Link>
                        </div>
                      )
                  })}
                </div>
                <Link className="href-no db pbt4" href="/forum">
                  <h5 className="new-a-more">查看更多</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
