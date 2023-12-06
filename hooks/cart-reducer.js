import { useEffect } from 'react'

const initialState = []

// useReducer 中的reducer 真正做動作的地方
export const cartReducer = (state, action) => {
  // 設定不同動作
  switch (action.type) {
    case 'ADD_TO_CART':
      // 用陣列的find方法 判斷
      return state.find((item) => item.name === action.item.name)
        ? state.map((item) =>
            item.name === action.item.name
              ? // true 就增加物件
                {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          )
        : [...state, { ...action.item, quantity: 1 }]
    case 'REMOVE_FROM_CART':
      // 把點到的商品利用filter + 反判斷 篩掉
      return state.filter((item) => item.name !== action.item.name) 
    // 當商品從購物車移除，對應的總價也要減少
    case 'DECREMENT_QUANTITY':
      return state.find((item) => item.name === action.item.name)?.quantity ===
        1 // 把 「按下移除按鈕的那個商品且數量為1」的商品篩掉
        ? state.filter((item) => item.name !== action.item.name)
        : // 數量不是1 就減少1
          state.map((item) =>
            item.name === action.item.name
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  item,
})

export const decrementItemQuantity = (item) => ({
  type: 'DECREMENT_QUANTITY',
  item,
})

export const removeFromCart = (item) => ({
  type: 'REMOVE_FROM_CART',
  item,
})

export const clearCart = () => ({
  type: 'CLEAR_CART',
})
