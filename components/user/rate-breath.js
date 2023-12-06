import { useEffect, useState } from 'react'
import Header from './header'
import SlideMenu from '@/components/user/slide-menu'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import HealthCheckOk from '@/components/user/health-check-ok'
import HealthCheckWarning from '@/components/user/health-check-waring'

import { Line } from 'react-chartjs-2'
// import test from '../data/test.json'

Chart.register(CategoryScale)

export default function Health() {
  const [data, setData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)

  const func = async () => {
    const res = await fetch('http://localhost:3005/user/health')
    const jsonData = await res.json()
    setData(jsonData)
  }

  useEffect(() => {
    func()
  }, [])

  
  // 處理data資料裡的日期
  const labels_data = data.map((dataArray) => {
    return dataArray.map((item) => {
      const date = new Date(item.bre_date)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}/${day}`
    })
  })

  // 儲存呼吸次數的資料
  const data_counting = data.map((dataArray) => {
    return dataArray.map((item) => {
      return item.bre_counting
    })
  })

  // 切割陣列以顯示前10筆呼吸資料
  const labels_dataShow = labels_data.map((dataArray) => {
    return dataArray.slice(startIndex, endIndex)
  })

  const data_countingShow = data_counting.map((dataArray) => {
    return dataArray.slice(startIndex, endIndex)
  })

  // 算出平均數字
  const data_countingSum = data_countingShow.map((dataArray)=>{
    return dataArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  })

  const data_averge= data_countingSum.map((dataArray)=>{
    return dataArray / 10
  })

 
  const chart = {
    labels: labels_dataShow[0],
    datasets: [
      {
        label: '清醒狀態 ',
        data: data_countingShow[0],
        fill: false,
        borderColor: '#ffc83e',
        pointStyle: 'circle',
        pointBackgroundColor: '#ffc83e',
        hoverBackgroundColor: '#ffe0a5',
        tension: 0.1,
      },
      {
        label: '熟睡狀態 ',
        data: data_countingShow[1],
        fill: false,
        borderColor: '#ad7fc3',
        pointStyle: 'circle',
        pointBackgroundColor: '#ad7fc3',
        hoverBackgroundColor: '#c6add1',
        tension: 0.1,
      },
    ],
  }

  const options = {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.4,
        to: 0.2,
        loop: true,
      },
    },
    scales: {
      y: {
        grid: {
          display: false, // 隱藏 Y 軸上的網格線
        },
        ticks: {
          display: true, // 顯示 Y 軸上的刻度文字
        },
        min: 0,
        max: 60,
      },
    },
    plugins: {
      legend: {
        display: false, // 将图例隐藏
      },
      tooltip: {
        padding: 12,
        titleFont: {
          size: 20,
        },
        backgroundColor: '#3b3b3b',
        caretSize: 8,
        cornerRadius: 8,
      },
    },
  }
  return (
    <>
      <Header />
      <div className="container mt-5 d-flex no-wrap justify-content-center">
        <SlideMenu />
        <div className="container col-9 ps-5 ">
          <div className="block-pet-tab">
            <div className="pet-tab">窩窩</div>
            <div className="pet-tab">阿修</div>
            <div className="pet-tab">燕窩</div>
          </div>
          <div className="mb-5 d-flex justify-content-between">
            <div className="d-flex">
              {/* 呼吸 */}
              <div className="health-card">
                <div className="state-title">心跳與呼吸</div>
                <HealthCheckOk />
                <div className="state-text-ok">維持良好</div>
              </div>
              {/* 體重 */}
              <div className="health-card">
                <div className="state-title">體重監測</div>
                <HealthCheckWarning />
                <div className="state-text-warning">需要注意</div>
              </div>
            </div>
            <div className="medicine-card flex-grow-1">
              <div className="medicine-tool">
                <div className="state-title">預防投藥</div>
                <div className="medicine-btn-edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
              <div className="medicine-item">
                <ol>
                  <li>心絲蟲預防藥</li>
                </ol>

                <div className="medicine-item-rule">每月一次</div>
              </div>
            </div>
          </div>
          {/* 呼吸紀錄 */}
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <h4 className="health-title">呼吸紀錄</h4>
              <div className="block-btn">
                <button className="mybtnp mybtnp--s mybtnp--c">
                  <i class="fa-solid fa-plus"></i> 新增紀錄
                </button>
              </div>
            </div>
            {/* 圖例 */}
            <div className="block-legend d-flex ">
              <div className="legend-group">
                <div className="legend-icon-awake"></div>
                <div className='legend-text'>清醒狀態:平均{data_averge[0]}</div>
              </div>
              <div className="legend-group">
                <div className="legend-icon-sleep"></div>
                <div className='legend-text'>熟睡狀態:平均{data_averge[1]}</div>
              </div>
            </div>
            <div>
              <Line data={chart} options={options}></Line>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
