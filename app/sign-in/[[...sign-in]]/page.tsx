import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <SignIn
      fallbackRedirectUrl="/new-user"
      signUpFallbackRedirectUrl="/new-user"
    />
  )
}

export default SignInPage
