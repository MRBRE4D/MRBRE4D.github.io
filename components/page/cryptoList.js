import Link from 'next/link'
import React from 'react'

const CryptoList = ({ coinData }) => {
  console.log(coinData)
  return (
    <table className="forum-table">
      <thead className="forum-table-th">
        <tr>
          <th className="forum-table-th-l">主題</th>
          <th className="forum-table-th-s">發文者</th>
          <th className="forum-table-th-s">最後回覆者</th>
          <th className="forum-table-th-s">最後回覆時間</th>
        </tr>
      </thead>
      <tbody>
        {coinData?.map((v, i) => {
          return (
            <tr className="forum-table-td" key={i}>
              <td className="forum-table-cell-l">
                <Link
                  className="forum-table-cell-title"
                  href={`/forum/${v?.art_id}`}
                >
                  {v?.art_title}
                </Link>
              </td>
              <td className="forum-table-cell-s">{v?.u_name}</td>
              <td className="forum-table-cell-s">{v?.u_name}</td>
              <td className="forum-table-cell-s">
                {v?.art_date.replace('T', ' ').replace('.000Z', '')}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CryptoList
