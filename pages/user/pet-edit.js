import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Header from '../../components/user/header'
import SlideMenu from '@/components/user/slide-menu'
import Swal from 'sweetalert2'
import Loading from '@/components/loading'

export default function PetEdit() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [isLoading])
  const { auth, setAuth } = useContext(AuthContext)

  // console.log(auth)
  const { id } = auth
  console.log(auth)

  // 儲存寵物各欄位填入資料用state
  const [data, setData] = useState([])

  useEffect(() => {
    if (auth.isAuth) {
      fetch(`http://localhost:3005/user/getpet?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          // 物件包裝成陣列
          const dataArray = Object.values(data.userData)
          setData(dataArray)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [auth])

  console.log('+++++++', data)
  // sweetalert2 新增毛孩-----------------------------------------------
  const addPet = async () => {
    const { value: formValues } = await Swal.fire({
      title: '新增毛孩',
      html:
        '<div class = "container w-100">' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="pet_name" class="me-2 event-label">毛孩名字</label>' +
        '<input id="pet_name" type ="text" class="flex-grow-1 event-input">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="datepicker" class="me-2 event-label">毛孩生日</label>' +
        '<input id="datepicker" type = "date" class="flex-grow-1 event-input">' +
        '</div>' +
        '<div class ="d-flex mb-4 align-items-center">' +
        '<label for="vari_id" class="me-2 event-label">毛孩品種</label>' +
        '<select class="event-input" name="vari_id" id="vari_id">' +
        '<option value="null" selected>請選擇</option>' +
        '<option value="0">貓</option>' +
        '<option value="1">狗</option>' +
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
          document.getElementById('pet_name').value,
          document.getElementById('datepicker').value,
          document.getElementById('vari_id').value,
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

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <div className="container mt-5 d-flex no-wrap justify-content-center">
        <SlideMenu />
        <div className="container col-9 ps-5 d-flex flex-column align-items-start ">
          <div className="w-100 block-btn mb-4">
            <button className="mybtnp mybtnp--s mybtnp--c" onClick={addPet}>
              <i class="fa-solid fa-plus"></i> 新增毛孩
            </button>
          </div>
          {data.map((v, i) => {
            return (
              <div
                key={v.pet_id}
                className="w-100 card-pet-info d-flex align-items-center"
              >
                <div className="pet-info-img">
                  <img
                    src={`/images/user/pet/${v.pet_photo}`}
                    alt={v.pet_name}
                  />
                </div>
                <div className="block-pet-info w-100">
                  <h3>{v.pet_name}</h3>
                  <div className="pet-info-veri d-flex flex-nowrap">
                    <h5>{v.vari_id == 0 ? '貓' : '狗'}</h5>
                    <h5>
                      <img
                        className="pet-info-gender"
                        src={`/images/stray/ICON-${
                          v.gender_id == '0' ? 'female' : 'male'
                        }.svg`}
                        alt=""
                      />
                    </h5>
                  </div>
                  <h5>生日：{v.pet_birth.toString().slice(0, 10)}</h5>
                </div>
                <div className="medicine-btn-edit align-self-start">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
