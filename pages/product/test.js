import React, { useState } from 'react'
// import TestCarouselPid2 from '@/components/product/test2-carouselPid'
// import TestCarouselPid from '@/components/product/unNecessary/test-carouselPid'
// import C3 from '@/components/product/PidSlick'
export default function Test() {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    setCount((prevCount) => {

      if (prevCount <= 0) return 0

      return prevCount - 1
      
    })
  }

  const reset = () => setCount(0)
  return (
    <>
      <button onClick={decrease}>&minus;</button>
      <div>{count}</div>
      <button onClick={increase}>&#43;</button>
      <button onClick={reset}>reset</button>
    </>
  )
}
