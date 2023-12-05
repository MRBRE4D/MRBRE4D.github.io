import React from 'react'
import LoginForm from '@/components/user/login-form'

export default function Login() {
  return (
    <>
      <LoginForm />
      <div className="bg-login">
        <img className='bg-login-l' src="/images/user/bg-login-left.svg" alt="" />
        <img className='bg-login-r' src="/images/user/bg-login-right.svg" alt="" />
      </div>
    </>
  )
}
