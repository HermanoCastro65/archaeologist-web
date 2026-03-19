'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginButton() {
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    await signIn('github')
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-panel border border-border rounded-lg hover:border-matrix hover:text-matrix transition disabled:opacity-50"
    >
      {loading ? 'Connecting...' : 'Sign in with GitHub'}
    </button>
  )
}
