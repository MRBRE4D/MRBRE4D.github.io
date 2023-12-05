import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import { chunk } from 'lodash'
import Swal from 'sweetalert2'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'


export default function Calendar() {
  const [data, setData] = useState([])
  const { auth, setAuth } = useContext(AuthContext)

  // console.log(auth)
  const { id } = auth
  console.log(auth)

  // 儲存寵物各欄位填入資料用state
  const [dataPet, setDataPet] = useState([])

  useEffect(() => {
    if (auth.isAuth) {
      fetch(`http://localhost:3005/user/getpet?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          // 物件包裝成陣列
          const dataArray = Object.values(data.userData)
          setDataPet(dataArray)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [auth])

  const func = async () => {
    const res = await fetch('http://localhost:3005/user/pet')
    setData(await res.json())
  }

  // 第一次渲染取得fetch
  useEffect(() => {
    func()
  }, [])

  const [myDate, setMyDate] = useState(0)
  const [now, setNow] = useState({
    y: new Date().getFullYear(),
    m: new Date().getMonth() + 1, // 注意回傳為 0~11
    d: new Date().getDate(),
    w: new Date().getDay(),
  })

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const weekDayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const days = new Date(now.y, now.m, 0).getDate()
  const firstDay = new Date(now.y, now.m - 1, 1).getDay()
  const allData = chunk(
    [
      ...Array(firstDay).fill(''),
      ...Array(days)
        .fill('')
        .map((v, i) => i + 1),
    ],
    7
  )

  const dataIsValue = Array.isArray(data) ? data : []
  const filterEvents = dataIsValue.filter((event) => {
    // 取得事件的年份、月份、日期
    const eventDateStr = event.create_time
    const eventDate = new Date(eventDateStr)
    const eventYear = eventDate.getFullYear()
    const eventMonth = eventDate.getMonth() + 1

    // 篩選出當前月份的事件
    return eventYear === now.y && eventMonth === now.m
  })

  const handleMonthMinus = () => {
    setNow((prevNow) => {
      let newMonth = prevNow.m - 1
      let newYear = prevNow.y

      if (newMonth < 1) {
        newMonth = 12
        newYear -= 1
      }

      setMyDate(0) // 清除選擇的日期
      return { ...prevNow, m: newMonth, y: newYear }
    })
  }

  const handleMonthAdd = () => {
    setNow((prevNow) => {
      let newMonth = prevNow.m + 1
      let newYear = prevNow.y

      if (newMonth > 12) {
        newMonth = 1
        newYear += 1
      }

      setMyDate(0) // 清除選擇的日期
      return { ...prevNow, m: newMonth, y: newYear }
    })
  }

  // 刪除事件-----------------------------------------------------------
  const removeEvent = async (id) => {
    const delId_send = {
      cal_id: id,
    }
    try {
      const res = await fetch('http://localhost:3005/user/pet/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delId_send),
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
  }

  // 編輯事件
  // 打開編輯器
  const openEventEdit = () => {
    document.getElementById('eventStatusNormal').style.display = 'none'
    document.getElementById('eventStatusEdit').style.display = 'block'
  }
  // 關閉編輯器
  // 打開編輯器
  const closeEventEdit = () => {
    document.getElementById('eventStatusNormal').style.display = 'block'
    document.getElementById('eventStatusEdit').style.display = 'none'
  }

  // 更新編輯
  const updatEvent = async (id) => {
    const update_date = document.getElementById('updateDate').value
    const update_title = document.getElementById('updateTitle').value
    const update_detail = document.getElementById('updateDetail').value
    const data_send = {
      cal_id: id,
      title: update_title,
      detail: update_detail,
      create_time: update_date,
    }
    try {
      const res = await fetch('http://localhost:3005/user/pet/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_send),
      })

      if (res) {
        // 請求
        const res_data = await res.json()
        closeEventEdit()
        func()
        console.log('給後端資料：', res_data)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  // sweetalert2 新增行程-----------------------------------------------
  const addEvent = async () => {
    const optionPet = dataPet.map((v, i) => {
      return `<option value="${v.pet_id}">${v.pet_name}</option>`
    })
    const result = optionPet.join(' +')
    const { value: formValues } = await Swal.fire({
      title: '新增行程',
      html:
        '<div class = "container w-100">' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="pet_id" class="me-2 event-label">選擇毛孩</label>' +
        '<select class="event-input" name="pet_id" id="pet_id">' +
        '<option value="null" selected>請選擇</option>' +
        `${result} </select>` +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="datepicker" class="me-2 event-label">新增行程</label>' +
        '<input id="datepicker" type = "date" class="flex-grow-1 event-input">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="title" class="me-2 event-label">行程標題</label>' +
        '<input id="title" type = "text" class="flex-grow-1 event-input" placeholder="請輸入行程標題">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="detail" class="me-2 event-label">行程內容</label>' +
        '<textarea id="detail" class="flex-grow-1 event-textarea"></textarea>' +
        '</div>' +
        '</div>',
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
          document.getElementById('pet_id').value,
          document.getElementById('title').value,
          document.getElementById('detail').value,
        ]
      },
    })
    if (formValues) {
      console.log('---------')
      console.log(formValues)
      const data_send = {
        create_time: formValues[0],
        pet_id: formValues[1],
        title: formValues[2],
        detail: formValues[3],
      }
      console.log('------+++++++++++---')
      console.log(data_send)

      try {
        const res = await fetch('http://localhost:3005/user/pet', {
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

  useEffect(() => {
    // 計算日期資訊
    const days = new Date(now.y, now.m, 0).getDate()
    const firstDay = new Date(now.y, now.m - 1, 1).getDay()
    const allData = chunk(
      [
        ...Array(firstDay).fill(''),
        ...Array(days)
          .fill('')
          .map((v, i) => i + 1),
      ],
      7
    )
    // 在此處理當月份變更時的邏輯
  }, [now])

  console.log('-------', dataPet)

  return (
    <>
      <div className="w-100 container d-flex flex-column mb-5 ">
        <div className="container-tool mb-3 d-flex justify-content-between align-items-center">
          {/* <h2 id="yearAndMonth">{`${now.y}/${now.m}/${
            myDate ? myDate : ''
          }`}</h2> */}
          <div className="block-search">
            <input
              type="text"
              className="search-event"
              placeholder="搜尋行程"
            />
          </div>
          <div className="block-select-month d-flex justify-content-center align-items-center">
            <button className="btn-month" onClick={handleMonthMinus}>
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <div className="d-flex flex-column align-items-center">
              <h6 className="year-focus">{`${now.y}`}</h6>
              <h5 className="mouth-focus">{`${month[now.m - 1]}`}</h5>
            </div>
            <button className="btn-month" onClick={handleMonthAdd}>
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
          <div className="block-btn">
            <button className="mybtnp mybtnp--s mybtnp--c" onClick={addEvent}>
              <i class="fa-solid fa-plus"></i> 新增行程
            </button>
          </div>
        </div>

        <div className="w-100 container-calendar">
          <table className="calendar-table">
            <thead>
              <tr>
                {weekDayList.map((v, i) => {
                  return (
                    <th
                      key={i}
                      className={`${
                        now.w == i ? 'calendar-th-now' : 'calendar-th'
                      }`}
                    >
                      {v}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody id="data">
              {allData.map((v, i) => {
                return (
                  <tr className="calendar-tr" key={i}>
                    {v.map((item, idx) => (
                      <td
                        key={idx}
                        onClick={() => {
                          if (item) setMyDate(item)
                        }}
                        className={
                          'calendar-td ' +
                          `${
                            now.y === new Date().getFullYear() &&
                            now.m === new Date().getMonth() + 1 &&
                            now.d === item
                              ? 'today'
                              : ''
                          } ${myDate === item ? 'chosen-date' : ''}`
                        }
                        style={{ cursor: 'pointer' }}
                        role="presentation"
                      >
                        <div className="calendar-date-box d-flex flex-column align-items-center justify-content-between">
                          <div
                            className="w-100 d-flex justify-content-end"
                            onClick={addEvent}
                            aria-hidden="true"
                          >
                            <h6 className="date-num">{item}</h6>
                          </div>
                          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                            {filterEvents.map((event) => {
                              const createDay = event.create_time.substring(
                                8,
                                10
                              )
                              // 使用 padStart 補足日期前面的零
                              const day = item.toString().padStart(2, '0')
                              // 比較事件日期與當日
                              if (createDay === day) {
                                return (
                                  <OverlayTrigger
                                    key={event.id}
                                    trigger="click"
                                    rootClose="true"
                                    placement="bottom"
                                    overlay={
                                      <Popover>
                                        <Popover.Body className="popover-body">
                                          {/* 靜態資料 */}
                                          <div
                                            id="eventStatusNormal"
                                            className="container-event-normal"
                                          >
                                            <div className="event-date">
                                              {event.create_time.slice(0, 10)}
                                            </div>
                                            <div className="event-title">
                                              {event.title}
                                            </div>
                                            <div className="event-detail">
                                              {event.detail}
                                            </div>
                                            <div className="event-tool">
                                              <div>
                                                <button
                                                  className="btn-event"
                                                  onClick={openEventEdit}
                                                >
                                                  <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button
                                                  className="btn-event"
                                                  onClick={() =>
                                                    removeEvent(event.cal_id)
                                                  }
                                                >
                                                  <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                          {/* 開啟編輯器 */}
                                          <div
                                            id="eventStatusEdit"
                                            className="container-event-edit"
                                          >
                                            <div className="event-intro">
                                              編輯行程
                                            </div>
                                            <div className="event-date-edit">
                                              <input
                                                type="date"
                                                id="updateDate"
                                                defaultValue={event.create_time.slice(
                                                  0,
                                                  10
                                                )}
                                                className="form-control event-date-edit"
                                              />
                                            </div>
                                            <input
                                              id="updateTitle"
                                              className="form-control event-title-edit"
                                              defaultValue={event.title}
                                            />

                                            <textarea
                                              id="updateDetail"
                                              className="form-control event-detail-edit"
                                            >
                                              {event.detail}
                                            </textarea>

                                            <div className="event-tool-edit">
                                              <div>
                                                <button
                                                  className="btn-event-edit-cancel"
                                                  onClick={closeEventEdit}
                                                >
                                                  <i class="fa-regular fa-circle-xmark"></i>
                                                </button>
                                                <button
                                                  className="btn-event-edit-check"
                                                  onClick={() =>
                                                    updatEvent(event.cal_id)
                                                  }
                                                >
                                                  <i class="fa-regular fa-circle-check"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </Popover.Body>
                                      </Popover>
                                    }
                                  >
                                    <button className="event-box">
                                      <div
                                        className={
                                          'pet-id ' +
                                          (event.pet_id == 1
                                            ? 'pet-id-1'
                                            : event.pet_id == 2
                                            ? 'pet-id-2'
                                            : event.pet_id == 3
                                            ? 'pet-id-3'
                                            : 'pet-id-4')
                                        }
                                      ></div>

                                      {event.title}
                                    </button>
                                  </OverlayTrigger>
                                )
                              } else {
                                return null
                              }
                            })}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
