import React, { createContext, useEffect, useReducer } from 'react'
import { cartReducer } from './cart-reducer'
export const CartContext = createContext()

// useReducer 的第三個可選參數(通常不用)，作為初始化的函式，
const initializer = () => {
  const storageData =
    typeof window !== 'undefined' ? localStorage.getItem(localKey) : null
  return storageData ? JSON.parse(storageData) : []
}

// 購物車的 localStorage key
const localKey = 'localCart'

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
