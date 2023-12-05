import { useEffect, useState } from 'react'
import Header from '../../components/user/header'
import SlideMenu from '@/components/user/slide-menu'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import Swal from 'sweetalert2'
import HealthCheckOk from '@/components/user/health-check-ok'
import HealthCheckWarning from '@/components/user/health-check-waring'
import Loading from '@/components/loading'

import { Line } from 'react-chartjs-2'

Chart.register(CategoryScale)

export default function Health() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [isLoading])
  
  const [data, setData] = useState([])
  const [breData, setBreData] = useState([])
  const [weiData, setWeiData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)

  const func = async () => {
    const res = await fetch('http://localhost:3005/user/pet/health')
    const jsonData = await res.json()
    // 這裡是異步處理
    setData(jsonData)
  }

  // 第一次渲染取得fetch
  useEffect(() => {
    func()
  }, [])

  // 第二次渲染處理取得的資料
  useEffect(() => {
    if (data) {
      setBreData(data.slice(0, 2))
      setWeiData(data.slice(2))
    }
  }, [data, startIndex, endIndex])

  // 呼吸次數資料-------------------------------------------------------
  // 處理data資料裡的日期
  const breLabels_data = breData.map((dataArray) => {
    return dataArray.map((item) => {
      const date = new Date(item.bre_date)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}/${day}`
    })
  })

  // 寵物資訊
  const pet_info = {
    pet_id: '1',
    pet_name: '窩窩',
    pet_src: '../../images/user/pet/900138001143299.jpg',
  }

  // 儲存呼吸次數的資料
  const breData_counting = breData.map((dataArray) => {
    return dataArray.map((item) => {
      return item.bre_counting
    })
  })


  // 切割陣列以顯示前10筆資料
  const breLabels_dataShow = breLabels_data.map((dataArray) => {
    return dataArray.slice(startIndex, endIndex)
  })

  const breData_countingShow = breData_counting.map((dataArray) => {
    return dataArray.slice(startIndex, endIndex)
  })

  // 算出平均數字
  const breData_countingSum = breData_countingShow.map((dataArray) => {
    return dataArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  })

  const breData_averge = breData_countingSum.map((dataArray) => {
    return dataArray / 10
  })

  // chartJS
  const breath_chart = {
    labels: breLabels_dataShow[0],
    datasets: [
      {
        label: '清醒狀態 ',
        data: breData_countingShow[0],
        fill: false,
        borderColor: '#ffc83e',
        pointStyle: 'circle',
        pointBackgroundColor: '#ffc83e',
        hoverBackgroundColor: '#ffe0a5',
        tension: 0.1,
      },
      {
        label: '熟睡狀態 ',
        data: breData_countingShow[1],
        fill: false,
        borderColor: '#ad7fc3',
        pointStyle: 'circle',
        pointBackgroundColor: '#ad7fc3',
        hoverBackgroundColor: '#c6add1',
        tension: 0.1,
      },
    ],
  }

  const breath_options = {
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
        display: false, // 隐藏圖例
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

  // 體重資料-------------------------------------------------------
  // 處理體重資料裡的日期
  const weiLabels_data = weiData.map((dataArray) => {
    return dataArray.map((item) => {
      const date = new Date(item.wei_date)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}/${day}`
    })
  })

  const weiData_counting = weiData.map((dataArray) => {
    return dataArray.map((item) => {
      return item.wei_num
    })
  })

  // 切割陣列以顯示前10筆資料
  const weiLabels_dataShow = weiLabels_data.map((dataArray) => {
    return dataArray.slice(startIndex, endIndex)
  })

  const weiData_countingShow = weiData_counting.map((dataArray) => {
    return dataArray.slice(startIndex, endIndex)
  })

  // 算出平均數字
  const weiData_countingSum = weiData_countingShow.map((dataArray) => {
    return dataArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  })

  const weiData_averge = weiData_countingSum.map((dataArray) => {
    return dataArray / 10
  })

  // chartJS
  const weight_chart = {
    labels: weiLabels_dataShow[0],
    datasets: [
      {
        label: '體重 ',
        data: weiData_countingShow[0],
        fill: false,
        borderColor: '#ffc83e',
        pointStyle: 'circle',
        pointBackgroundColor: '#ffc83e',
        hoverBackgroundColor: '#ffe0a5',
        tension: 0.1,
      },
    ],
  }

  const weight_options = {
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
        max: weiData_averge[0] + 4,
      },
    },
    plugins: {
      legend: {
        display: false, // 隱藏圖例
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

  // sweetaler2 新增呼吸次數
  const addEventBre = async () => {
    const { value: formValues } = await Swal.fire({
      title: '紀錄呼吸次數',
      html:
        '<div class ="d-flex flex-column mb-4 align-items-center">' +
        '<div class ="container-alert-pet-photo">' +
        `<img class ="alert-pet-photo" src=${pet_info.pet_src} alt=${pet_info.pet_name}>` +
        '</div>' +
        `<div id="petId" class ="alert-pet-name">${pet_info.pet_name}</div>` +
        '</div>' +
        '<div class = "container w-100">' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="datepicker" class="me-2 event-label">記錄日期</label>' +
        '<input id="datepicker" type = "date" class="flex-grow-1 event-input">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="status01" class="me-2 event-label">清醒狀態</label>' +
        '<input id="status01" type = "number" class="flex-grow-1 event-input" min="10" max="100" >' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="status02" class="me-2 event-label">熟睡狀態</label>' +
        '<input id="status02" type = "number" class="flex-grow-1 event-input" min="10" max="100" >' +
        '</div>' +
        '</div>',
      customClass: 'swal2-overflow',
      showConfirmButton: true,
      buttonsStyling: false,
      confirmButtonText: '新增',
      customClass: {
        confirmButton: 'mybtnp mybtnp--m mybtnp--b',
      },
      onOpen: function () {
        document.getElementById('datepicker').datetimepicker({})
      },
      preConfirm: () => {
        return [
          document.getElementById('datepicker').value,
          document.getElementById('status01').value,
          document.getElementById('status02').value,
        ]
      },
    })
    if (formValues) {
      const data_send = [
        {
          bre_date: formValues[0],
          pet_id: pet_info.pet_id,
          pet_status: 0,
          bre_counting: formValues[1],
        },
        {
          bre_date: formValues[0],
          pet_id: pet_info.pet_id,
          pet_status: 1,
          bre_counting: formValues[2],
        },
      ]
      try {
        const res = await fetch('http://localhost:3005/user/pet/add/bre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data_send),
        })

        if (res) {
          // 請求
          const res_data = await res.json()
          func()
          console.log('給後端資料：', res_data)
        }
      } catch (ex) {
        console.log(ex)
      }

      Swal.fire({
        title: '新增成功',
        text: '已新增行程到毛孩日曆',
        icon: 'success',
        showConfirmButton: true,
        buttonsStyling: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'mybtnp mybtnp--m mybtnp--b',
        },
      })
    }
  }

  const addEventWei = async () => {
    const pet_info = {
      pet_id: '1',
      pet_name: '窩窩',
      pet_src: '../../images/user/pet/900138001143299.jpg',
    }
    const { value: formValues } = await Swal.fire({
      title: '紀錄體重',
      html:
        '<div class ="d-flex flex-column mb-4 align-items-center">' +
        '<div class ="container-alert-pet-photo">' +
        `<img class ="alert-pet-photo" src=${pet_info.pet_src} alt=${pet_info.pet_name}>` +
        '</div>' +
        `<div id="petId" class ="alert-pet-name">${pet_info.pet_name}</div>` +
        '</div>' +
        '<div class = "container w-100">' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="datepickerWei" class="me-2 event-label">記錄日期</label>' +
        '<input id="datepickerWei" type = "date" class="flex-grow-1 event-input">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="wetNum" class="me-2 event-label">體重</label>' +
        '<input id="wetNum" type = "number" class="flex-grow-1 event-input" step="0.1" min="1" max="50" >' +
        '<span>kg</span>' +
        '</div>' +
        '</div>',
      customClass: 'swal2-overflow',
      showConfirmButton: true,
      buttonsStyling: false,
      confirmButtonText: '新增',
      customClass: {
        confirmButton: 'mybtnp mybtnp--m mybtnp--b',
      },
      onOpen: function () {
        document.getElementById('datepickerWei').datetimepicker({})
      },
      preConfirm: () => {
        return [
          document.getElementById('datepickerWei').value,
          document.getElementById('wetNum').value,
        ]
      },
    })
    if (formValues) {
      const data_send = [
        {
          wei_date: formValues[0],
          pet_id: pet_info.pet_id,
          wei_num: formValues[1],
        },
      ]

      try {
        const res = await fetch('http://localhost:3005/user/pet/add/wei', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data_send),
        })

        if (res) {
          // 請求
          const res_data = await res.json()
          func()
          console.log('給後端資料：', res_data)
        }
      } catch (ex) {
        console.log(ex)
      }

      Swal.fire({
        title: '新增成功',
        text: '已新增行程到毛孩日曆',
        icon: 'success',
        showConfirmButton: true,
        buttonsStyling: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'mybtnp mybtnp--m mybtnp--b',
        },
      })
    }
  }
  return (
    <>
     {isLoading && <Loading />}
      <Header />
      <div className="container mt-5 d-flex no-wrap justify-content-center">
        <SlideMenu />
        <div className="container col-9 ps-5 mb-5">
          <div className="block-pet-tab">
            <div className="pet-tab pet-tab--active">窩窩</div>
            <div className="pet-tab">浩呆</div>
            <div className="pet-tab">阿修</div>
            <div className="pet-tab">叡叡</div>
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
          <div className="w-100 mb-80">
            <div className="d-flex justify-content-between">
              <h4 className="health-title">呼吸紀錄</h4>
              <div className="block-btn">
                <button
                  className="mybtnp mybtnp--s mybtnp--c"
                  onClick={addEventBre}
                >
                  <i class="fa-solid fa-plus"></i> 新增紀錄
                </button>
              </div>
            </div>
            {/* 圖例 */}
            <div className="block-legend d-flex ">
              <div className="legend-group">
                <div className="legend-icon-awake"></div>
                <div className="legend-text">
                  清醒狀態：平均 {breData_averge[0]}
                </div>
              </div>
              <div className="legend-group">
                <div className="legend-icon-sleep"></div>
                <div className="legend-text">
                  熟睡狀態：平均 {breData_averge[1]}
                </div>
              </div>
            </div>
            <div>
              <Line data={breath_chart} options={breath_options}></Line>
            </div>
          </div>
          {/* 體重紀錄 */}
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <h4 className="health-title">體重紀錄</h4>
              <div className="block-btn">
                <button
                  className="mybtnp mybtnp--s mybtnp--c"
                  onClick={addEventWei}
                >
                  <i class="fa-solid fa-plus"></i> 新增紀錄
                </button>
              </div>
            </div>
            {/* 圖例 */}
            <div className="block-legend d-flex ">
              <div className="legend-group">
                <div className="legend-icon-awake"></div>
                <div className="legend-text">
                  平均體重 {weiData_averge[0]} kg
                </div>
              </div>
            </div>
            <div>
              <Line data={weight_chart} options={weight_options}></Line>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
