import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SingleMapDetail from '@/components/googleMap/SingleMapDetail'
import GeocodeSearch from '@/components/googleMap/GeocodeSearch'

export default function StrayDetail() {
  const router = useRouter()

  const [stray, setStray] = useState()

  const getStray = async (sid) => {
    console.log(sid)
    const res = await fetch(`http://localhost:3005/stray/${sid}`)
    console.log(res)
    const data = await res.json()
    console.log(data)
    setStray(data[0])
  }

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { sid } = router.query
      getStray(sid)
    }
  }, [router.isReady, router.query])

  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)

  useEffect(() => {
    console.log(lat)
  }, [lat])

  useEffect(() => {
    console.log(lng)
  }, [lng])

  const MySwal = withReactContent(Swal)

  const adoptionInstructions = async () => {
    const { value: accept } = await Swal.fire({
      // header:'<strong>認養須知</strong>',
      title: '<h1 class="adoptTitle">找到你的Mr. Right了嗎？</h1>',
      imageUrl: '/images/stray/titleGivemeFive.svg',
      html:
        '<p align="left">1.請詳細閱讀以下認養須知：</br></p>' +
        '<p align="left">&emsp;a.須年滿20歲並取得家人同意</br></p>' +
        '<p align="left">&emsp;b.須配合結紮及植入晶片</br></p>' +
        '<p align="left">&emsp;c.須簽認養切結書並同意後續追蹤</br></p>' +
        '<p align="left">&emsp;d.不得24小時綁繩或關籠</br></p>' +
        '<p align="left">&emsp;e.每年需施打預防針並於每月投心絲蟲藥與除蚤</br></p>' +
        '<p align="left">&emsp;f.在外租屋者需徵求房東同意</br></p>' +
        '<p align="left">2.若同意以上認養須知，可先透過留言方式，詢問該動物的詳細情況，或經由送養人留下的聯絡方式，聯絡送養人。</br></p>' +
        '<p align="left">3.若有意願認養，可告知送養人以下訊息：</br></p>' +
        '<p align="left">&emsp;a.是否有養狗經驗</br></p>' +
        '<p align="left">&emsp;b.生活環境</br></p>' +
        '<p align="left">&emsp;c.飼養方式</br></p>',
      showCloseButton: true,
      input: 'checkbox',
      inputValue: 0,
      inputPlaceholder: '我同意以上認養須知',
      buttonsStyling: false,
      confirmButtonText: '同意 <i class="fa fa-arrow-right"></i>',
      customClass: {
        confirmButton: 'adopt',
      },
      inputValidator: (result) => {
        return !result && '你需要勾選同意認養須知!'
      },
    })
    if (accept) {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(function () {
        router.push('/stray/form')
      })
    }
  }
  const color =
    stray?.color_id == 1
      ? 'black'
      : stray?.color_id == 2
      ? 'white'
      : stray?.color_id == 3
      ? 'gray'
      : stray?.color_id == 4
      ? 'yellow'
      : stray?.color_id == 5
      ? 'orange'
      : ''
  console.log(color)

  return (
    <>
      {stray?.strayId && (
        <div className="strayDetailContect">
          <div className="strayDetail">
            <div className="strayDetailIntroduce">
              <h4>
                <button
                  className="strayDetailBtn"
                  onClick={() => {
                    Swal.fire({
                      html:
                        `<h3 class="mb-3">Hi~~我是<span class="text-primary">${stray?.nickName}</span>~~</h3>` +
                        `<h3>請多多指教!!</h3>`,
                      showConfirmButton: true,
                      buttonsStyling: false,
                      confirmButtonText: '我想認識',
                      customClass: {
                        confirmButton: 'mybtnp mybtnp--m mybtnp--b',
                      },
                    })
                  }}
                >
                  {stray?.nickName}
                </button>
              </h4>
              <h1>{stray?.name}</h1>
              <h4>基本資料</h4>
              <h5>
                {stray?.vari_name}
                <img src={`/images/stray/ICON-${stray.gender}.svg`} alt="" />
              </h5>
              <div className="strayDetailYears">
                <h5>{stray.age}歲</h5>
                <h5>
                  {stray.bodyId == 0
                    ? '小型犬'
                    : stray.bodyId == 1
                    ? '中型犬'
                    : '大型犬'}{' '}
                </h5>
                <div
                  className="strayDetailColor"
                  style={{ backgroundColor: `${color}` }}
                >
                  <img
                    className="strayDetailBackground"
                    src={`/images/stray/${color}-dog.svg`}
                    alt=""
                    width={200}
                    height={400}
                  />
                </div>
                <h5>{stray.color_name}色</h5>
              </div>
              <h4>健康狀況</h4>
              <h5>{stray.healthy}</h5>
              <h4>所在位置</h4>
              <h5>{stray.she_name}</h5>
            </div>
            <div className="strayDetailImg">
              <img
                className="mugImg"
                src={`/images/stray/${stray.strayImg}`}
                alt="pudding-dog"
                width="480"
                height="480"
              />
            </div>
          </div>
          <div className="strayStory">
            <h2>故事背景</h2>
            <h5>{stray.backgroundStory}</h5>
          </div>
          <div className="strayMoreImg mb-4">
            <img
              src={`/images/stray/${stray.strayImg1}`}
              alt=""
              width={280}
              height={280}
            />
            <img
              src={`/images/stray/${stray.strayImg2}`}
              alt=""
              width={280}
              height={280}
            />
            <img
              src={`/images/stray/${stray.strayImg3}`}
              alt=""
              width={280}
              height={280}
            />
            <img
              src={`/images/stray/${stray.strayImg4}`}
              alt=""
              width={280}
              height={280}
            />
          </div>
          <div className="strayAdoptBtn mb-5">
            <button
              className="mybtny mybtny--l mybtny--c"
              onClick={adoptionInstructions}
            >
              我要認養
            </button>
          </div>
          <div className="staryStory-map">
            <GeocodeSearch
              addressAll={stray.county_name + stray.local_name + stray.address}
              setLat={setLat}
              setLng={setLng}
            />
            <SingleMapDetail
              lat={lat}
              lng={lng}
              infoTitle={`${stray.she_name}`}
              infoContent={`${
                stray.county_name + stray.local_name + stray.address
              }`}
            />
          </div>
        </div>
      )}
    </>
  )
}
