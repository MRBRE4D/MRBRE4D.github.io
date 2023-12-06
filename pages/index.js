import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Fireflies from '@/components/firefly/firefly'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import Carousel from '@/components/product/carousel'
import ShopCard from '@/components/product/shopCard'
import ProductContext from '@/hooks/product-fetch'
import CountUp from 'react-countup'
import StrayCard from '@/components/stray/stray-card'
import Waterfall from '@/components/Waterfall'
import Swal from 'sweetalert2'
import Loading from '@/components/loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [isLoading])
  const [dataArticle, setDataArticle] = useState([])
  const [stray, setStray] = useState()
  const [catArticle, setCatArticle] = useState()
  const [dogArticle, setDogArticle] = useState()

  // 商品資料
  const getData = useContext(ProductContext)
  const func = async () => {
    const res = await fetch('http://localhost:3005/home-art')
    // const jsonData = await res.json()
    // 這裡是異步處理
    // setDataArticle(await res.json())
  }
  const getStrayCard = async () => {
    const res = await fetch('http://localhost:3005/stray')
    // console.log('res=' + res)
    const data = await res.json()
    // console.log(data)
    setStray(data)
  }
  const getCatArticle = async () => {
    const res = await fetch('http://localhost:3005/forum')
    // console.log('res=' + res)
    const data = await res.json()
    console.log(data)
    setCatArticle(data.result1)
    setDogArticle(data.result2)
  }

  // 第一次渲染取得fetch
  useEffect(() => {
    func()
  }, [])
  useEffect(() => {
    getStrayCard()
  }, [])
  useEffect(() => {
    getCatArticle()
  }, [])

  const strayNum = Math.ceil(Math.random() * stray?.length)
  const catNum = Math.ceil(Math.random() * catArticle?.length)
  const dogNum = Math.ceil(Math.random() * dogArticle?.length)

  // 謝幕 alert
  const sayGoodBye = () => {
    Swal.fire({
      title: '',
      html:
        '<div class="goodbye-p">謝謝各位廠商蒞臨</br>以及各位老師與同學這段時間的教導與協助</br>我們即將展開新的旅程</div>' +
        '<div class="goodbye-h1">祝各位同學未來一帆風順</div>',
      imageUrl: '/images/team-dance.gif',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showConfirmButton: true,
      buttonsStyling: false,
      confirmButtonText: '報告到此結束',
      customClass: {
        confirmButton: 'mybtny mybtny--m mybtnp--a',
      },
    })
  }

  return (
    <>
      {isLoading && <Loading />}
      <ParallaxProvider>
        <div className="container-keyart">
          <Parallax
            speed={-10}
            translateY={(0, -10)}
            scale={[1, 1, 'easeOutCubic']}
            opacity={[1, 0]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div id="banner-keyart-5" className="keyart-layer">
              <img
                className="layer-05-cloud"
                src="./images/index/keyart/layer-05-cloud.svg"
                alt=""
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={(0, 0.8)}
            scale={[1, 1, 'easeOutCubic']}
            opacity={[1, 0]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div id="banner-keyart-4" className="keyart-layer">
              <img
                className="layer-04-land"
                src="./images/index/keyart/layer-04-land.svg"
                alt=""
              />
              <img
                className="layer-04-thicket-l"
                src="./images/index/keyart/layer-04-thicket-l.svg"
                alt=""
              />
              <img
                className="layer-04-thicket-r"
                src="./images/index/keyart/layer-04-thicket-r.svg"
                alt=""
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={0}
            scale={[1, 1.02, 'easeOutCubic']}
            opacity={[1, 0]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div id="banner-keyart-3" className="keyart-layer">
              <img
                className="layer-03-land"
                src="./images/index/keyart/layer-03-land.svg"
                alt=""
              />
              <img
                className="layer-03-thicket-r"
                src="./images/index/keyart/layer-02-thicket-r.svg"
                alt=""
              />
              <img
                className="layer-03-pot-l"
                src="./images/index/keyart/layer-03-pot-l.svg"
                alt=""
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={0}
            scale={[1, 1.08, 'easeOutCubic']}
            opacity={[1, 0]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div id="banner-keyart-2" className="keyart-layer">
              <img
                className="layer-02-thicket-l"
                src="./images/index/keyart/layer-02-thicket-l.svg"
                alt=""
              />
              <img
                className="layer-02-grass-r"
                src="./images/index/keyart/layer-03-grass-r.svg"
                alt=""
              />

              <img
                className="layer-02-people"
                src="./images/index/keyart/layer-02-people.svg"
                alt=""
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={0}
            scale={[1, 1.8, 'easeOutCubic']}
            opacity={[1, 0]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div id="banner-keyart-1" className="keyart-layer">
              <img
                className="layer01-tree-top"
                src="./images/index/keyart/layer-01-tree-top.svg"
                alt=""
              />

              <img
                className="layer01-thicket-l"
                src="./images/index/keyart/layer-01-thicket-l.svg"
                alt=""
              />
              <img
                className="layer01-thicket-r"
                src="./images/index/keyart/layer-01-thicket-r.svg"
                alt=""
              />
            </div>
          </Parallax>

          <Parallax
            speed={-10}
            scale={[1, 1.05, 'easeOutCubic']}
            opacity={[1, 0]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div className="keyart-layer">
              <div className="container-keyart-slogan">
                <div className="h0">你是我的全世界</div>
                <div className="keyart-p">
                  毛孩陪伴我們走過每個時刻，如同生命旅程中的夥伴，我們期望在這趟美好的旅程中，一起陪你們度過風風雨雨，從認養媒合、日常照顧、到告別，《伴旅・伴你》提供最完整的資訊。
                </div>
              </div>
            </div>
          </Parallax>
        </div>

        <div className="container-keyart-adopt">
          <Parallax
            speed={-10}
            translateY={(0, 10)}
            easing={'ease'}
            shouldAlwaysCompleteAnimation={true}
          >
            <div className="adopt-layer">
              <img
                className="adopt-bg-wave"
                src="./images/index/adopt/bg-wave.svg"
                alt="wave"
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={(0, 10)}
            easing={'ease'}
            shouldAlwaysCompleteAnimation={true}
          >
            <div className="adopt-layer">
              <img
                className="adopt-unequal-brown"
                src="./images/index/adopt/unequal-brown.svg"
                alt="bubble"
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={(0, 30)}
            easing={'ease'}
            shouldAlwaysCompleteAnimation={true}
          >
            <div className="adopt-layer">
              <img
                className="adopt-circle-cat"
                src="./images/index/adopt/circle-cat.svg"
                alt="cat"
              />
            </div>
            <div className="adopt-layer">
              <img
                className="adopt-cage"
                src="./images/index/adopt/cage.svg"
                alt="cage"
              />
            </div>
          </Parallax>
          <Parallax
            speed={-10}
            translateY={(0, 4)}
            easing={'ease'}
            opacity={[0.6, 1]}
            shouldAlwaysCompleteAnimation={true}
          >
            <div className="h0 block-highlight">
              還有
              <span className="text-highlight">
                <CountUp end={1177} />
              </span>
              毛毛待認養
            </div>
          </Parallax>
        </div>

        <div className="container-keyart-after">
          {/* 認養區域--------------------------------------------------- */}
          <div className="block-adopt">
            {/* 認養卡片 */}
            <div className="container card-adopt d-flex flex-column align-items-center">
              <div className="mb-5 w-100 d-flex justify-content-between align-items-center">
                <div className="mt-5 w-100 d-flex flex-wrap justify-content-center">
                  {stray?.map((v, i) => {
                    for (let j = 0; j < 4; j++) {
                      if (v.strayId == (strayNum + j) % stray.length) {
                        return (
                          <div
                            className="card card-index"
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
                      } else if (
                        v.strayId == strayNum + j &&
                        (strayNum + j) % stray.length == 0
                      ) {
                        return (
                          <div
                            className="card card-index"
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
                      }
                    }
                  })}
                </div>
              </div>
              <Link href={'/stray'}>
                <button className="mybtny mybtny--l mybtny--e">
                  尋找我的伴旅
                </button>
              </Link>
            </div>
            {/* 認養滾動-標題 */}
            <Parallax
              speed={-10}
              translateY={(0, 18)}
              easing={'easeOutCubic'}
              opacity={[1, 0.6]}
              shouldAlwaysCompleteAnimation={true}
            >
              {/* 黃球------------------------------------- */}
              <img
                className="decor-bg-circle"
                src="./images/index/adopt/circle-y.svg"
                alt=""
              />
            </Parallax>
            {/* 葉子----------------------------------- */}
            <div className="decor-adopt">
              <Parallax
                speed={-10}
                translateY={0}
                scale={[1, 1.08, 'easeOutCubic']}
                opacity={[1, 1]}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="decor-bg-leaf-l"
                  src="./images/index/adopt/leaf-l.svg"
                  alt=""
                />
                <img
                  className="decor-bg-leaf-r"
                  src="./images/index/adopt/leaf-r.svg"
                  alt=""
                />
              </Parallax>
            </div>
          </div>
          {/* 醫療文章區域--------------------------------------------------- */}
          <div className="block-med">
            <div className="mb-5 d-flex flex-column justify-content-between align-items-center">
              <div className="med-phone container d-flex justify-content-center align-items-center">
                <div className="med-article-photo">
                  <img
                    className="book-frame"
                    src="./images/index/article/book-frame.svg"
                    alt=""
                  />
                  <img
                    className="book-mask"
                    src="./images/medical/medical.jpg"
                    alt=""
                  />
                </div>
                <div className="med-article d-flex flex-column align-items-start">
                  <h1 className="med-article-title">
                    【毛小孩 你的生命夥伴】寵物生病了怎麼辦：適合的獸醫在哪裡？
                  </h1>
                  <div className="med-article-content">
                    想讓寵物快樂過一生，一位好的家庭獸醫會是你最棒的隊友。
                    <br />
                    找到一位能長期合作的家庭獸醫，不僅可以獲得即時的醫療協助與正確的飼養知識，更能穩定追蹤動物們的健康狀況，讓你不必為急病無醫而慌亂煩心。
                  </div>
                  <button className="mybtny mybtny--l mybtny--e">
                    閱讀完整文章
                  </button>
                </div>
              </div>
            </div>
            {/* 醫療文章-底部 */}
            <img
              className="med-bg-wave"
              src="./images/index/med/wave-y.svg"
              alt=""
            />
            <Parallax
              speed={-10}
              easing={'ease'}
              translateY={(0, -1)}
              translateX={[0, -6]}
              shouldAlwaysCompleteAnimation={true}
            >
              <div className="decor-med">
                <img
                  className="med-dog"
                  src="./images/index/med/lay-dog.svg"
                  alt=""
                />
              </div>
            </Parallax>
          </div>
          {/* 商城區域------------------------------------------------------- */}
          <div className="block-shop">
            <div className="shop-banner">
              <Carousel />
            </div>

            {/* 商城卡片 */}
            <div className="container card-adopt d-flex flex-column align-items-center">
              <div className=" d-flex justify-content-between align-items-center">
                {getData.slice(0, 5).map((v) => {
                  return (
                    <ShopCard
                      com={v.company}
                      pid={v.id}
                      key={v.id}
                      file={v.file}
                      price={v.price}
                      name={v.name}
                      type={v.type2}
                    />
                  )
                })}
              </div>
              <Link href={'/product'}>
                <button className="mybtny mybtny--l mybtny--e">去逛逛</button>
              </Link>
            </div>
          </div>
          {/* 討論區區域------------------------------------------------------- */}
          <div className="block-article">
            {/* 討論區滾動-狗 */}
            <div className="decor-article-top">
              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={(0, 15)}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="decor-cicle-p"
                  src="./images/index/article/circle-pink.svg"
                  alt=""
                />
              </Parallax>
              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={(0, 30)}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="decor-dog-play"
                  src="./images/index/article/dog-play.svg"
                  alt=""
                />
              </Parallax>
            </div>
            {/* 討論區卡片 */}
            <div className="container d-flex flex-column justify-content-start align-items-center">
              {catArticle?.map((v, i) => {
                if (11 == v?.art_id) {
                  return (
                    <div
                      className="card-article d-flex justify-content-center align-items-center"
                      key={v.art_id}
                    >
                      <div className="article-photo-frame">
                        <img
                          src={`./images/cat-forum/${v.file}`}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div className="article-textarea">
                        <div className="article-time">
                          {v.art_date.replace('T', ' ').replace('.000Z', '')}
                        </div>
                        <h4 className="article-title">{v.art_title}</h4>
                        <div className="article-content">{v.art_content}</div>
                      </div>
                    </div>
                  )
                }
              })}
              {dogArticle?.map((v, i) => {
                if (9 == v?.art_id) {
                  return (
                    <div
                      className="card-article d-flex justify-content-center align-items-center"
                      key={v.art_id}
                    >
                      <div className="article-photo-frame">
                        <img
                          src={`./images/dog-forum/${v.file}`}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div className="article-textarea">
                        <div className="article-time">
                          {v.art_date.replace('T', ' ').replace('.000Z', '')}
                        </div>
                        <h4 className="article-title">{v.art_title}</h4>
                        <div className="article-content">{v.art_content}</div>
                      </div>
                    </div>
                  )
                }
              })}
              {catArticle?.map((v, i) => {
                if (10 == v?.art_id) {
                  return (
                    <div
                      className="card-article d-flex justify-content-center align-items-center"
                      key={v.art_id}
                    >
                      <div className="article-photo-frame">
                        <img
                          src={`./images/cat-forum/${v.file}`}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div className="article-textarea">
                        <div className="article-time">
                          {v.art_date.replace('T', ' ').replace('.000Z', '')}
                        </div>
                        <h4 className="article-title">{v.art_title}</h4>
                        <div className="article-content">{v.art_content}</div>
                      </div>
                    </div>
                  )
                }
              })}
              {dogArticle?.map((v, i) => {
                if (3 == v?.art_id) {
                  return (
                    <div
                      className="card-article d-flex justify-content-center align-items-center"
                      key={v.art_id}
                    >
                      <div className="article-photo-frame">
                        <img
                          src={`./images/dog-forum/${v.file}`}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div className="article-textarea">
                        <div className="article-time">
                          {v.art_date.replace('T', ' ').replace('.000Z', '')}
                        </div>
                        <h4 className="article-title">{v.art_title}</h4>
                        <div className="article-content">{v.art_content}</div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            {/* 討論區滾動-貓 */}
            <div className="decor-article-bottom">
              <Parallax
                speed={-5}
                easing={'ease'}
                translateY={(0, 4)}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="decor-article-bg-wave"
                  src="./images/index/article/bg-wave-bottom-y.svg"
                  alt=""
                />
              </Parallax>
              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={(0, 40)}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="decor-cat-fly"
                  src="./images/index/article/cat-fly.svg"
                  alt=""
                />
              </Parallax>
              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={0}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="decor-article-bg-wave-cover"
                  src="./images/index/article/bg-wave-bottom-g.svg"
                  alt=""
                />
              </Parallax>
            </div>
          </div>
          {/* 火化區域------------------------------------------------------- */}
          <div className="container-rip-keyart-top">
            <div className="decor-article-end"></div>
            <div id="rip-keyart-bg" className="rip-layer-start">
              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={(0, 0)}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="rip-bg-01"
                  src="./images/index/life/rip-bg-01.svg"
                  alt=""
                />
              </Parallax>

              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={(0, -10)}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="rip-bg-02"
                  src="./images/index/life/rip-bg-02.svg"
                  alt=""
                />
              </Parallax>
            </div>
            {/* 手 */}
            <Parallax
              speed={-10}
              easing={'ease'}
              translateY={(0, 40)}
              shouldAlwaysCompleteAnimation={true}
            >
              <div id="rip-keyart-light" className="rip-layer">
                <img
                  className="rip-hand-l"
                  src="./images/index/life/hand.svg"
                  alt=""
                />
                <img
                  className="rip-hand-r"
                  src="./images/index/life/hand.svg"
                  alt=""
                />
              </div>
            </Parallax>
            {/* 貓 */}
            <Parallax
              speed={-10}
              easing={'ease'}
              translateY={(0, 35)}
              shouldAlwaysCompleteAnimation={true}
            >
              <div id="rip-keyart-light" className="rip-layer">
                <img
                  className="rip-light"
                  src="./images/index/life/rip-light.svg"
                  alt=""
                />
              </div>
            </Parallax>
            <Parallax
              speed={-10}
              easing={'ease'}
              translateY={(0, 10)}
              shouldAlwaysCompleteAnimation={true}
            >
              <div id="rip-keyart-cat" className="rip-layer">
                <img
                  className="rip-cat"
                  src="./images/index/life/rip-cat.svg"
                  alt=""
                />
              </div>
            </Parallax>
            {/* 山 */}
            <div id="rip-keyart-04" className="rip-layer-bottom">
              <Parallax speed={-10} easing={'ease'} translateY={(0, 15)}>
                <img
                  className="rip-layer-04"
                  src="./images/index/life/rip-layer-04.svg"
                  alt=""
                />
              </Parallax>
              <Parallax speed={-10} easing={'ease'} translateY={(0, -4)}>
                <img
                  className="rip-layer-03"
                  src="./images/index/life/rip-layer-03.svg"
                  alt=""
                />
              </Parallax>
              <Parallax speed={-10} easing={'ease'} translateY={(0, 10)}>
                <img
                  className="rip-layer-02"
                  src="./images/index/life/rip-layer-02.svg"
                  alt=""
                />
              </Parallax>
              <Parallax speed={-10} easing={'ease'} translateY={0}>
                <img
                  className="rip-layer-01"
                  src="./images/index/life/rip-layer-01.svg"
                  alt=""
                />
              </Parallax>
            </div>
          </div>
          {/* 愛的標語 */}
          <div className="rip-memory-start">
            <div className="rip-memory-slogan d-flex flex-column justify-content-start align-items-center">
              <Parallax
                speed={1}
                translateY={(0, -10)}
                scale={[1, 1.2, 'easeOutCubic']}
                opacity={[0, 1.8]}
                shouldAlwaysCompleteAnimation={true}
              >
                <img
                  className="rip-icon-love"
                  src="./images/index/memory/ICON-love.svg"
                  alt=""
                />
                <h1 className="rip-memory-title">旅程總有結束的時候</h1>
                <p className="rip-memory-p">但愛是超越時間的語言</p>
              </Parallax>
            </div>
          </div>
          {/* 影片 */}
          <div className="container-video">
            <video
              autoplay="true"
              loop="true"
              muted="true"
              playsinline
              width="100%"
            >
              <source src="./videos/index/memory_1080.mp4" type="video/mp4" />
            </video>
          </div>
          {/* 再見標語 */}
          <div className="rip-memory-bottom">
            {/* 再見裝飾 */}
            <Parallax
              speed={-10}
              easing={'ease'}
              scale={(1, 1.4)}
              shouldAlwaysCompleteAnimation={true}
            >
              <img
                className="rip-flower-r"
                src="./images/index/memory/rip-flower-r.svg"
                alt=""
              />
              <img
                className="rip-flower-l"
                src="./images/index/memory/rip-flower-l.svg"
                alt=""
              />
            </Parallax>
            <Fireflies></Fireflies>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="rip-memory-bye">
                謝謝你
                <br />
                用一輩子的時間陪伴我
              </h1>
              <button onClick={sayGoodBye} className="mb-5 btn-l-gold">
                好好說再見
              </button>
              <Parallax
                speed={-10}
                easing={'ease'}
                translateY={(0, -4)}
                shouldAlwaysCompleteAnimation={true}
              >
                <div className="block-rip-candle">
                  <div className="candle-flash-1"></div>
                  <div className="candle-flash-2"></div>
                  <img
                    className="rip-candle"
                    src="./images/index/life/rip-candle.svg"
                    alt=""
                  />
                </div>
              </Parallax>
            </div>
          </div>
          {/* 天堂 */}
          <div className="heaven-container">
            <Waterfall />
            <div className="heaven-door-block">
              <img
                className="heaven-door"
                src="./images/index/heaven/door-frame.svg"
                alt=""
              />
              <div className="heaven-door-bg">
                <img src="./images/index/heaven/door-cloud.svg" alt="" />
                <img
                  className="heaven-door-bg-mirror"
                  src="./images/index/heaven/door-cloud.svg"
                  alt=""
                />
              </div>
            </div>
            {/* 天堂背景 */}
            <div className="heaven-bg-cloud">
              <img src="./images/index/heaven/door-bg-cloud.svg" alt="" />
            </div>
            <div className="heaven-end"></div>
            <div className="index-end-wave">
              <img src="./images/index/index-end-wave.svg" alt="" />
            </div>
          </div>
          <div className="index-end"></div>
        </div>
      </ParallaxProvider>
    </>
  )
}
