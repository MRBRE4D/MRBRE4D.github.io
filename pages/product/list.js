import FliterBar from '@/components/product/filterbar'
import ShopCard from '@/components/product/shopCard'
import SortBar from '@/components/product/sortBar'
// import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import ProductContext from '@/hooks/product-fetch'
import { useRouter } from 'next/router'

export default function ProductIndex() {
  const getData = useContext(ProductContext)
  const [data, setData] = useState([])
  const router = useRouter()
  // const { pid } = router.query

  const searchQuery = router.query.search
  const type1Query = router.query.type1
  const type2Query = router.query.type2



  useEffect(() => {
    let filteredData = getData
    console.log('err')
    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.name.includes(searchQuery)
      )
    }
    if (type1Query) {
      if (type1Query !== '全部')
        filteredData = filteredData.filter((item) => item.type1 === type1Query)
    }
    if (type2Query) {
      const type2Array = type2Query.split(',')

      filteredData = filteredData.filter((item) =>
        type2Array.some((value) => item.type2.includes(value))
      )
    }

    setData(filteredData)
  }, [searchQuery, type1Query, type2Query, getData])

  //! 太複雜
  // useEffect(() => {
  //   // 如果網址有搜尋關鍵字
  //   if (searchQuery) {
  //     // 以關鍵字篩選資料
  //     const searchData = getData.filter((item) =>
  //       item.name.includes(searchQuery)
  //     )
  //     // 如果有被選擇的篩選商品，進行篩選
  //     if (typeQuery) {
  //       const typeData = searchData
  //         ? searchData.filter((item) => {
  //             const typeValues = typeQuery.split(',') // 將 typeQuery 拆分為陣列 貓飼料
  //             return typeValues.some((value) => item.type2.includes(value))
  //           })
  //         : getData.filter((item) => {
  //             const typeValues = typeQuery.split(',') // 將 typeQuery 拆分為陣列
  //             return typeValues.some((value) => item.type2.includes(value))
  //           })
  //       setData(typeData)
  //     }
  //     setData(searchData)
  //   } else {
  //     if (typeQuery) {
  //       const typeData = getData.filter((item) => {
  //         const typeValues = typeQuery.split(',') // 將 typeQuery 拆分為陣列
  //         return typeValues.some((value) => item.type2.includes(value))
  //       })

  //       // 沒有關鍵字就以原本的資料
  //       setData(typeData)
  //     }
  //   }
  // }, [searchQuery, typeQuery, getData])

  // 排序
  const orderBy = (t) => {
    const newData = [...data]

    if (t == 'ASC') {
      setData(
        newData.sort((a, b) => {
          return a.price - b.price
        })
      )
    }
    if (t == 'DESC') {
      setData(
        newData.sort((a, b) => {
          return b.price - a.price
        })
      )
    }
    if (t == 'COM') {
      setData(
        newData.sort((a, b) => {
          if (a.company > b.company) return -1
          if (a.company < b.company) return 1
          return 0
        })
      )
    }
    if (t == 'PRO') {
      setData(
        newData.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
      )
    }
  }

  return (
    <>
      {getData?.length > 0 && (
        <div className="container mt-120">
          <div className="row mt-5">
            <div className="col-12  col-xs-12  col-sm-6 col-md-4 col-lg-3 ">
              <FliterBar />
            </div>
            <div className="con-12 col-xs-12  col-sm-6 col-md-8 col-lg-9   ">
              <SortBar data={data} orderBy={orderBy} />
              <div className=" row  ">
                {data?.map((v) => {
                  return (
                    <ShopCard
                      data={v}
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
