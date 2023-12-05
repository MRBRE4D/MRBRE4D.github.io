import React from 'react'

export default function Fire() {
  return (
    <>
      <div className="container-fluid w-100">
        <h1 className="fire-title">
          寶貝的最後一哩路
          <br />
          讓我們一起陪他啟程
        </h1>
        <div className="container-video">
          <video
            autoplay="true"
            loop="true"
            muted="true"
            playsinline
            width="100%"
          >
            <source src="./videos/fire/fire.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="fire-die-img">
          <img src="/images/fire/fire-header.svg" alt="" />
        </div>
        <div className="fire-step-top">
          <div className="step-box step-box-1 d-flex align-items-center">
            <img src="/images/fire/ICON-burn-step-01.svg" alt="" />
            <div className="step-text">
              <h2>臨終諮詢</h2>
              <h5>協助處理各項後續相關事宜</h5>
            </div>
          </div>
          <div className="step-box step-box-2 d-flex align-items-center">
            <img src="/images/fire/ICON-burn-step-02.svg" alt="" />
            <div className="step-text">
              <h2>預約接體服務</h2>
              <h5>自家、醫院或其他指定地點預約接送服務</h5>
            </div>
          </div>
          <div className="step-box step-box-3 d-flex align-items-center">
            <img src="/images/fire/ICON-burn-step-03.svg" alt="" />
            <div className="step-text">
              <h2>代祭祀服務/基礎淨身</h2>
              <h5>提供代理祭拜及整理儀容之服務</h5>
            </div>
          </div>
          <div className="step-box step-box-4 d-flex align-items-center">
            <img src="/images/fire/ICON-burn-step-04.svg" alt="" />
            <div className="step-text">
              <h2>暫置冰存與擇日</h2>
              <h5>提供暫時的安置冰存，以便安排選擇良辰吉日告別火化</h5>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="fire-flower-l">
              <img src="/images/fire/r.svg" alt="" />
            </div>
            <div className="w-100 step-box step-box-5 d-flex align-items-center">
              <img src="/images/fire/ICON-burn-step-05.svg" alt="" />
              <div className="step-text">
                <h2>靈堂告別式</h2>
                <h5>中式或西式，供祭祀與告別儀式之室內場所</h5>
              </div>
            </div>
            <div className="fire-flower-r">
              <img src="/images/fire/r.svg" alt="" />
            </div>
          </div>
          <img src="/images/fire/fire-path-line.svg" alt="" />
        </div>
        <div className="fire-step-bottom d-flex flex-nowrap justify-content-center align-items-start">
          <div className="step-box step-box-6 d-flex align-items-start">
            <img src="/images/fire/ICON-burn-step-06A.svg" alt="" />
            <div className="step-text step-text-bottom">
              <h2>專屬個別火化</h2>
              <h5 className="step-box-bottom-line">
                可陪同參與火化儀式，火化完成研磨骨灰
              </h5>
              <h5>
                骨灰可自行帶回，或安置於寵物靈骨塔。或選擇業者提供之花葬、樹葬、海葬......服務等，亦可種植紀念植葬盆栽
              </h5>
            </div>
          </div>
          <div className="step-box step-box-7 d-flex align-items-start">
            <img src="/images/fire/ICON-burn-step-06B.svg" alt="" />
            <div className="step-text step-text-bottom">
              <h2>團體火化</h2>
              <h5 className="step-box-bottom-line">
                時間由業者全權代為安排，儀式完成會以LINE或簡訊方式回覆告知
              </h5>
              <h5>
                寵物將與其他夥伴一同安葬於業者提供之公共樹葬區，讓寶貝回歸自然。
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
