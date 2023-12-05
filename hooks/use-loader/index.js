import { useState, useContext, createContext } from 'react'
// 可自訂載入動畫元件
import { Loader, LoaderText } from './components'

const LoaderContext = createContext(null)

// 延遲x ms秒用，手動控制關閉有用
function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms))
  }
}

// 全站的Context狀態
// loader是元件，可以放於全站版面上，要用時用showLoader控制
// close 代表幾秒後關閉
export const LoaderProvider = ({
  children,
  close = 2,
  CustomLoader = Loader,
}) => {
  const [show, setShow] = useState(false)

  return (
    <LoaderContext.Provider
      value={{
        showLoader: () => {
          setShow(true)

          // auto close
          if (close) {
            setTimeout(() => {
              setShow(false)
            }, close * 1000)
          }
        },
        hideLoader: () => (!close ? setShow(false) : null),
        loading: show,
        delay,
        loader: () => <CustomLoader show={show} />,
        loaderText: (text) => <LoaderText text={text} show={show} />,
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

// 配合context的元件
export const useLoader = () => {
  const context = useContext(LoaderContext)

  if (!context) {
    throw new Error('useLoader must be used within LoadingProvider')
  }

  return context
}
