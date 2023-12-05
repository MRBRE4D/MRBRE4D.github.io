import React, { useState, useEffect } from 'react'
function SlideMenu() {
  const [currentPage, setCurrentPage] = useState('')
  const [currentItemPage, setCurrentItemPage] = useState('')

  useEffect(() => {
    const currentPath = window.location.pathname
    if (currentPath.includes('/user/pet-health')) {
      setCurrentItemPage('我的毛孩')
      setCurrentItemPage('健康監測')
      setCurrentPage('我的毛孩')
    }else if (currentPath.includes('/user/pet-edit')) {
      setCurrentItemPage('毛孩資料')
      setCurrentPage('我的毛孩')
      
    } else if (currentPath.includes('/user')) {
      setCurrentItemPage('行程日曆')
      setCurrentPage('我的毛孩')
      
    }
  }, [])

  function AccordionItem({
    title,
    items,
    isOpen,
    toggleAccordion,
    currentItemPage,
  }) {
    return (
      <li className={isOpen ? 'open' : ''}>
        <div className="link" onClick={toggleAccordion}>
          <i className="fa fa-chevron-down"></i>
          {title}
        </div>
        <ul className="submenu" style={{ display: isOpen ? 'block' : 'none' }}>
          {items.map((item, index) => (
            <li
              key={index}
              className={
                currentItemPage === item.text ? 'slidemenu-active' : ''
              }
            >
              <a href={item.src}>{item.text}</a>
            </li>
          ))}
        </ul>
      </li>
    )
  }

  function Accordion({ items, currentPage, setCurrentPage }) {
    return (
      <ul className="accordion">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            items={item.items}
            isOpen={currentPage === item.title}
            toggleAccordion={() => setCurrentPage(item.title)}
            currentItemPage={currentItemPage}
          />
        ))}
      </ul>
    )
  }

  const items = [
    {
      title: '我的毛孩',
      items: [
        { text: '行程日曆', src: '/user' },
        { text: '健康監測', src: '/user/pet-health' },
        { text: '毛孩日誌', src: '#' },
        { text: '毛孩資料', src: '/user/pet-edit' },
      ],
    },
    {
      title: '會員帳號',
      items: [
        { text: '帳號設定', src: '/user/edit' },
    
      ],
    },
    {
      title: '訂單記錄',
      items: [],
    },
    {
      title: '討論區',
      items: [
        { text: '我的發文', src: '#' },
        { text: '我的收藏', src: '#' },
      ],
    },
  ]

  return (
    <div className="container col-3">
      <Accordion
        items={items}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCurrentItemPage={setCurrentItemPage}
      />
    </div>
  )
}

export default SlideMenu
