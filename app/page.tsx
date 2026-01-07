import { SignInButton } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div>
      <SignInButton mode='modal' ></SignInButton>
    </div>
  )
}

export default page