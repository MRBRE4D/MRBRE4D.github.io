import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CryptoList from './cryptoList'
import Pagination from './pagination'

const App = () => {
  const [coinData, setCoinData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3005/forum')

    setCoinData(res.data.result1)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  const currentPosts = coinData.slice(firstPostIndex, lastPostIndex)

  return (
    <div className="container-forum-table">
      <CryptoList coinData={currentPosts} />
      <Pagination
        totalPosts={coinData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default App
