import React from 'react'

export default function Waterfall() {
  const waterfall_name = [
    '旺財',
    '白點點',
    '大頭仔',
    '老大',
    '豆豆',
    '啟正熊',
    '浩呆',
    '旺旺',
    '棉花',
    '花生',
    '胖子橘',
    '可樂',
    '奶茶',
    '小黑',
    'Whiskers',
    'Fluffy',
    'Buddy',
    'Mittens',
    'Tiger',
    'Bella',
    'Luna',
    'Max',
    'Charlie',
    'Oliver',
    'Lucy',
    'Lily',
    'Chloe',
    '黑輪',
    'Happy',
    '浩呆',
  ]
  return (
    <>
      <section className="waterfall-section">
        {[...Array(15).keys()].map((i) => (
          <div className="waterfall-img" key={i}>
            <h4>{waterfall_name[i]}</h4>

            <div className='waterfall-block'>
              <img
                src={`/images/index/waterfall/waterfall-${i + 1}.jpeg`}
                alt=""
              />
            </div>
          </div>
        ))}
        {/* <div className="waterfall-img">
          <h4>《壬辰之戰》</h4>
          <img
            src="${}"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>《政問》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/《政問》.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>《釵》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/《釵》.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>1210平權專車</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/1210平權專車.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>女人迷樂園</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/女人迷樂園.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>月釀杯</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/月釀杯.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>世界人權日婚姻平權彩虹巴士計畫</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/世界人權日婚姻平權彩虹巴士計畫.jpg"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>他們在島嶼寫作</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/他們在島嶼寫作.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>台東聖母醫院：太麻里部落廚房助建計畫</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/台東聖母醫院：太麻里部落廚房助建計畫.jpg"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>台灣原生網路影集 Mr.Bartender</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/台灣原生網路影集 Mr.Bartender.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>全民挺同婚，現正募資中</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/全民挺同婚，現正募資中.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>我滿懷希望的有病信仰之《創神計畫》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/我滿懷希望的有病信仰之《創神計畫》.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>法律白話文運動之報紙頭版廣告</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/法律白話文運動之報紙頭版廣告.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>社會民主黨</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/社會民主黨.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>時代力量</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/時代力量.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>浪孩起步走——飼主責任教育募資計劃</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/浪孩起步走——飼主責任教育募資計劃.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>茶籽堂：苦茶油復興之路</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/茶籽堂：苦茶油復興之路.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>彩虹故鄉的願望</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/彩虹故鄉的願望.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>報導者</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/報導者.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>幾米X宜蘭幸福轉運站</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/幾米X宜蘭幸福轉運站.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>黃玠瑋《Wonderland》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/黃玠瑋《Wonderland》.jpg"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>廖文強《喜劇人生》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/廖文強《喜劇人生》.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>綿羊犬《世界冒險》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/綿羊犬《世界冒險》.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>臺灣．故事：十個歷史的轉捩點</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/臺灣．故事：十個歷史的轉捩點.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>臺灣吧</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/臺灣吧.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>臺灣吧《大抓周計畫》</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/臺灣吧《大抓周計畫》.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>駱師傅冰淇淋修復計畫</h4>
          <img
            src="http://ifunding.crowdwatch.tw/assets/img/main/little_pics/駱師傅冰淇淋修復計畫.png"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>總之為了五年五百億就來一場大亂鬥吧</h4>
          <img
            src="/images/index/waterfall/waterall-28.jpeg"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>鮮乳坊一週年暨小瓶鮮乳認養新牧場計畫</h4>
          <img
            src="/images/index/waterfall/waterall-29.jpeg"
            alt=""
          />
        </div>
        <div className="waterfall-img">
          <h4>ARRC前瞻火箭</h4>
          <img
            src="/images/index/waterfall/waterall-30.jpeg"
            alt=""
          />
        </div> */}
      </section>
    </>
  )
}
