import React, { useEffect, useState } from 'react'
import styles from './fliterbar.module.scss'
import { useRouter } from 'next/router'

export default function FliterBar({ data, setData }) {
  const router = useRouter()
  // 下拉選單狀態
  const [dropDownState, setDropDownState] = useState([])
  // 下拉次要分類狀態
  const [dropDownOptionState, setDropDownOptionState] = useState([])

  //* 單選分類1的狀態
  const [selectedPetType, setSelectedPetType] = useState('')

  //* checkbox的內容value集合 (複選)
  const [selectedTypes, setSelectedTypes] = useState([])

  //* checkbox勾選狀態
  const [checkedItems, setCheckedItems] = useState({})

  //* 搜尋
  const searchQuery = router.query.search || ''
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      router.push(`/product/list?search=${e.target.value}`)
    }
  }
  //* 單選
  const handleTypeChange = (type) => {
    setSelectedPetType(type)
  }

  //*篩選
  const handleCheckboxChange = (e) => {
    const type = e.target.value
    const id = e.target.id
    const isChecked = e.target.checked

    //* 勾選狀態切換
    setCheckedItems({
      ...checkedItems,
      [id]: isChecked,
    })

    if (isChecked) {
      // 如果被勾選，將該value添加到篩選的state
      setSelectedTypes([...selectedTypes, type])
    } else {
      // 如果取消勾選，從已選擇的列表中刪除商品類型
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  useEffect(() => {
    if (
      searchQuery !== router.query.search ||
      selectedPetType !== router.query.type1 ||
      selectedTypes.join(',') !== router.query.type2
    ) {
      // 最後塞到 router.query的內容
      const queryParams = {}

      if (searchQuery) {
        queryParams.search = searchQuery
      }
      if (selectedPetType) {
        queryParams.type1 = selectedPetType
      }
      if (dropDownOptionState.length>0) {
        queryParams.type2 = dropDownOptionState
      }
      if (selectedTypes.length > 0) {
        queryParams.type2 = selectedTypes.join(',')
      }
      // console.log('queryParams')
      // console.log(queryParams)
      if (queryParams.search || queryParams.type1 || queryParams.type2) {
        router.push({
          pathname: '/product/list',
          query: queryParams,
        })
      }
    }
  }, [selectedTypes, selectedPetType, searchQuery,dropDownOptionState])
  // checkbox

  const Checkbox = ({
    type = 'checkbox',
    name,
    id,
    value,
    onChange,
    checked = false,
  }) => {
    return (
      <input
        type={type}
        className="me-1"
        name={name}
        value={value}
        checked={checked}
        id={id}
        onChange={onChange}
      />
    )
  }
  const checkboxes = [
    {
      id: '1',
      name: '貓罐頭',
    },
    {
      id: '2',
      name: '貓飼料',
    },
    {
      id: '3',
      name: '貓砂',
    },
    {
      id: '4',
      name: '狗罐頭',
    },
    {
      id: '5',
      name: '狗飼料',
    },
    {
      id: '6',
      name: '狗零食',
    },
    {
      id: '7',
      name: '寵物禮儀',
    },
    {
      id: '8',
      name: '抓板玩具',
    },
    {
      id: '9',
      name: '清潔用品',
    },
  ]

  return (
    <>
      <div className={styles.Search}>
        <div className={styles.searchBar}>
          <input
            type="text"
            onKeyUp={handleSearch}
            className={styles.searchInput} // placeholder="搜尋商品名稱"
          />
        </div>
        <div className={styles.searchText}>
          <h3>篩選商品</h3>
        </div>
        <div className={styles.petType}>
          <h5>種類</h5>
          <div className={styles.petIcon}>
            <label>
              <input
                type="radio"
                name="petType"
                value="全部"
                checked={selectedPetType === '全部'}
                onChange={() => handleTypeChange('全部')}
              />
              全部
            </label>
            <label>
              <input
                type="radio"
                name="petType"
                value="狗"
                checked={selectedPetType === '狗'}
                onChange={() => handleTypeChange('狗')}
              />
              狗
            </label>
            <label>
              <input
                type="radio"
                name="petType"
                value="貓"
                checked={selectedPetType === '貓'}
                onChange={() => handleTypeChange('貓')}
              />
              貓
            </label>
            <label>
              <input
                type="radio"
                name="petType"
                value="其他"
                checked={selectedPetType === '其他'}
                onChange={() => handleTypeChange('其他')}
              />
              其他
            </label>
            {/* 圖片 */}
            {/* <div>
              <img
                src="/images/product/fliter/dog-empty.svg"
                width={40}
                height={40}
                alt=""
              />
              <img
                src="/images/product/fliter/cat-empty.svg"
                width={40}
                height={40}
                alt=""
              />
            </div> */}
          </div>
        </div>

        <div className={styles.checkSearch}>
          <h5>快速勾選</h5>
          <div className={styles.checkGroup}>
            {checkboxes.map((item) => (
              <div key={item.id}>
                <Checkbox
                  type="checkbox"
                  name="productType"
                  value={item.name}
                  checked={checkedItems[item.id]}
                  id={item.id}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={item.id}>
                  <h6>{item.name}</h6>
                </label>
              </div>
            ))}
            {/* <div>
              <input
                className="me-1"
                type="checkbox"
                name="productType"
                value="貓砂"
                id="1"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="1">
                <h6>貓砂</h6>
              </label>
            </div>
            <div>
              <input
                className="me-1"
                type="checkbox"
                name="productType"
                value="狗飼料"
                id="2"
                checked={true}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="2">
                <h6>狗飼料</h6>
              </label>
            </div> */}
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.category1}>
            <h5>主要分類</h5>
            <select
              onChange={(e) => {
                setDropDownState(e.target.value)
                handleTypeChange(e.target.value)
              }}
            >
              <option value="全部">請選擇</option>
              <option value="貓">貓</option>
              <option value="狗">狗</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div className={styles.category2}>
            <h5>次要分類</h5>

            {dropDownState == '貓' ? (
              <select
                onChange={(e) => {
                  setDropDownOptionState(e.target.value)
                }}
              >
                <option value="">請選擇</option>
                <option value="貓飼料">貓飼料</option>
                <option value="貓罐頭">貓罐頭</option>
                <option value="貓砂">貓砂</option>
              </select>
            ) : dropDownState == '狗' ? (
              <select
                onChange={(e) => {
                  setDropDownOptionState(e.target.value)
                }}
              >
                <option value="">請選擇</option>
                <option value="狗飼料">狗飼料</option>
                <option value="狗罐頭">狗罐頭</option>
                <option value="狗零食">狗零食</option>
              </select>
            ) : dropDownState == '其他' ? (
              <select
                onChange={(e) => {
                  setDropDownOptionState(e.target.value)
                }}
              >
                <option value="">請選擇</option>
                <option value="寵物禮儀">寵物禮儀</option>
                <option value="抓板玩具">抓板玩具</option>
                <option value="清潔用品">清潔用品</option>
              </select>
            ) : (
              <select name="color" id="color">
                <option value="">請選擇</option>
              </select>
            )}
          </div>
        </div>
        {/* <div className={styles.priceInput}>
          <h6>NT$</h6>
          <input type="text" />-
          <input type="text" />
          <input
            className={styles.priceBtn}
            type="image"
            src="/images/product/fliter/paw.svg"
          />
        </div> */}
      </div>
    </>
  )
}
