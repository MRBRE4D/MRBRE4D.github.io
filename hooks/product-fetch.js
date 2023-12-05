import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'

const ProductContext = createContext(null)
export const ProductProvider = ({ children }) => {
  const [getData, setGetData] = useState([])
  // const [payment, setPayment] = useState([])
  const router = useRouter()

  const func = async () => {
    const res = await fetch('http://localhost:3005/product/list')
    const data = await res.json()
    setGetData(data)
  }
  // const getPay = async () => {
  //   const res = await fetch('http://localhost:3005/payment/newebpay_notify')
  //   const data = await res.json()
  //   setPayment(data)
  // }

  // const Pidfunc = async (pid) => {
  //   const res = await fetch(`http://localhost:3005/product/list/${pid}`)
  //   const data = await res.json()
  //   setPidData(data)
  // }

  // console.log(getData)
  useEffect(() => {
    func()
    // getPay()
  }, [])

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { pid } = router.query
  //     Pidfunc(pid)
  //   }
  // }, [router.query, router.isReady])

  return (
    <ProductContext.Provider value={getData}>
      {children}
    </ProductContext.Provider>
  )
}
export default ProductContext
