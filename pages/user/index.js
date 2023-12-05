import React, { useState, useEffect } from 'react'
import Header from '../../components/user/header'
import SlideMenu from '@/components/user/slide-menu'
import Calendar from '@/components/user/pet-calendar'
import Loading from '@/components/loading'

export default function UserIndex() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [isLoading])
  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <div className="container mt-5 d-flex no-wrap justify-content-center">
        <SlideMenu />
        <div className="container col-9 ps-5">
          <Calendar />
        </div>
      </div>
    </>
  )
}
