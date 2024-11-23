import AuthForm from '@/components/AuthForm'
import React from 'react'

const SignIn = () => {
    const userDetails = {
        firstName: "Collins"
    }
  return (
    <div className="">
        <AuthForm type="signin"   />
    </div>
  )
}

export default SignIn
