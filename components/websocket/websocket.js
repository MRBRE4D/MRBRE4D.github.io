import React, { useState, useEffect, useContext, useRef } from 'react'
import webSocket from 'socket.io-client'
import AuthContext from '@/context/AuthContext'
import style from '@/components/websocket/websocket.module.scss'

export default function Websocket() {
  const [ws, setWs] = useState(null)
  const [message, setMessage] = useState('')
  const [messageReceive, setMessageReceive] = useState([])
  // const [authId, setAuthId] = useState(null) // Create a state variable for auth.id
  const { auth, setAuth } = useContext(AuthContext)

  const inputRef = useRef('')
  // const authId = ()=>{
  //   if(auth.id!==0){
  //     socket.emit("id",auth.id);
  //   }
  // }

  const connectWebSocket = () => {
    //開啟
    console.log('連線')
    setWs(webSocket('http://localhost:3001'))
  }

  useEffect(() => {
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log('success connect!哈哈')
      //設定監聽
      initWebSocket()
    }
  }, [ws])

  const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉

    ws.on('getMessageAll', (data) => {
      setMessageReceive((prevMessage) => [...prevMessage, data])
      // setAuthId(data.id)
      console.log(data)
    })
  }

  const sendMessage = () => {
    //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    ws.emit('getMessageAll', { message, id: auth.id });
    setMessage(''); // 清空文字輸入框
  }
  console.log(inputRef.current.type)
  return (
    <>
      <div
        className={ws == null ? style.webContentOpen : style.webContentStart}
      >
        {ws == null ? (
          <button className={style.webSendBtn} onClick={connectWebSocket}>
            聯絡我們
          </button>
        ) : (
          ''
        )}
        {ws !== null ? (
          <div>
            <div className={style.webTitle}>
              <h4 style={{ fontWeight: 'bolder' }}>與客服聯繫</h4>
            </div>
            <div className={style.webName}>{auth.nickname}</div>
            <div className={style.webMessage}>
              {messageReceive.map((message, i) => (
                <div
                  className={
                    message.id == auth.id
                      ? style.webTextRight
                      : style.webTextLeft
                  }
                  key={i}
                >
                  {message.message}
                </div>
              ))}
            </div>
            <div className={style.webInput}>
              <input
                type="text"
                placeholder="請輸入文字"
                value={message}
                // ref={inputRef}
                onChange={(event) => {
                  setMessage(event.target.value)
                }}
              />
              <button className={style.webBtn} onClick={sendMessage}>
                傳送
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

// ReactDom.render(<Main />, document.getElementById('root'))
