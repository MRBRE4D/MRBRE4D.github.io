import React from 'react'

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  //計算看看有幾頁
  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className="page-container">
      <button
        className="page-button"
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev === 1) return prev
            return prev - 1
          })
        }
      >
        {'<'}
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className={
              currentPage === page ? 'active  page-button' : 'page-button'
            }
            key={index}
            onClick={() => {
              setCurrentPage(page)
            }}
          >
            {page}
          </button>
        )
      })}
      <button
        className="page-button"
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev === pages.length) return prev
            return prev + 1
          })
        }
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
