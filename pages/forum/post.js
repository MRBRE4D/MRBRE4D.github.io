import { useState, useRef, useMemo, useContext } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import HTMLReactParser from 'html-react-parser'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AuthContext from '@/context/AuthContext'

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
})

export default function Post() {
  const router = useRouter()
  const [isTitle, setIsTitle] = useState('請輸入文章標題')
  const [isTextarea, setIsTextarea] = useState('')
  const [isClick, setIsClick] = useState('option1')
  //文字編輯器
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [post, setPost] = useState({
    title: '',
    content: '',
    file: '',
  })

  const contentRef = useRef('')

  const { auth, setAuth } = useContext(AuthContext)


  const { id } = auth


  const MySwal = withReactContent(Swal)

  //點擊search背景會變色
  const handleOptionChange = (e) => {
    setIsClick(e.target.value)
  }
  const fieldChanged = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const contextfieldChanged = (data) => {
    setPost({ ...post, content: data })
  }

  // const handleSubmit = () => {
  //   // 在這裡發送inputValue到後端
  //   fetch('http://localhost:3005/forum/post', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ title: isTitle, Textarea: isTextarea }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('後端返回的數據:', data)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  // }

  const handleSubmit = async (e) => {
    const res = await axios
      .post('http://localhost:3005/forum/post', {
        text: post.title,
        content: post.content,
        id: id,
      })
      .then(
        Swal.mixin({
          toast: true,
          position: 'top-center',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
          .fire({
            icon: 'success',
            title: '發文成功',
          })
          .then(function () {
            router.push('/forum')
          })
      )
  }

  return (
    <>
      <img className="post-bgimg-f" src="/forum/post-top.svg" alt=""></img>
      <div className="c-section__main">
        <div className="c-post main_editor_section">
          <div className="c-post__header">
            <h3>發表新文章</h3>
            <span></span>
          </div>
          <div>
            <select
              className="c-post-sleact"
              value={isClick}
              onChange={handleOptionChange}
            >
              <option value={'option1'} className="c-post-option" disabled>
                選擇發布的地方
              </option>
              <option value={'option2'} className="c-post-option">
                貓貓論壇
              </option>
              <option value={'option3'} className="c-post-option">
                狗狗論壇
              </option>
              {/* <option value={2}>醫療論壇</option> */}
            </select>
          </div>
          <input
            type="text"
            name="title"
            placeholder="請輸入標題"
            className="c-post-tittle form-control"
            onChange={fieldChanged}
          ></input>
          <br></br>
          <div className="fun">
            <div className="fun-all">
              <JoditEditor ref={contentRef} onChange={contextfieldChanged} />

              {/* <button className="fun-button">B</button>
              <button className="fun-button">I</button> */}
            </div>
            <input type="file" className="post-file" />
          </div>
          {/* <textarea
            className="c-post-context form-control"
            rows="10"
            cols="50"
            value={isTextarea}
            onChange={(e) => {
              setIsTextarea(e.target.value)
            }}
          ></textarea> */}
          <button className="c-post-botton" onClick={handleSubmit}>
            送出
          </button>
        </div>
      </div>
      <img className="post-bgimg-end" src="/forum/pet-data.svg" alt=""></img>
    </>
  )
}
