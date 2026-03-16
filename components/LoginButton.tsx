'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('github')}
      className="flex items-center gap-2 px-4 py-2 bg-black border border-border rounded hover:bg-gray-900"
    >
      Sign in with GitHub
    </button>
  )
}
