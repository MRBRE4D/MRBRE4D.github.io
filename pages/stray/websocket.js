import React, { useState, useEffect, useContext } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'
import WebSocket from '@/components/websocket/websocket'
import AuthContext from '@/context/AuthContext'

export default function Main() {
  const [ws, setWs] = useState(null)
  const [message, setMessage] = useState('')
  const [messageReceive, setMessageReceive] = useState([])
  // const [authId, setAuthId] = useState(null) // Create a state variable for auth.id
  const { auth, setAuth } = useContext(AuthContext)
  console.log(auth.id)

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
    ws.emit('getMessageAll', { message, id: auth.id })
  }

  return (
    <>
      <div>
        <h1>123</h1>
        <h1>123</h1>
        <h1>123</h1>
        <input type="button" value="連線" onClick={connectWebSocket} />
        {ws !== null ? (
          <div>
            <div>
              <input
                type="text"
                placeholder="請輸入文字"
                onChange={(event) => {
                  setMessage(event.target.value)
                }}
              />
              <button onClick={sendMessage}>send</button>
            </div>
            <h2>訊息</h2>
            {/* {authId} */}
            <div>
              {messageReceive.map((message, i) => (
                <div
                  className={
                    message.id == auth.id ? 'webTextRight' : 'webTextLeft'
                  }
                  key={i}
                >
                  {message.message}
                </div>
              ))}
            </div>
          </div>
        ) : (
          '請按連線'
        )}
      </div>
    </>
  )
}

// ReactDom.render(<Main />, document.getElementById('root'))
