'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await signOut()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 rounded-lg bg-panel border border-border text-white hover:border-red-400 hover:text-red-400 transition disabled:opacity-50"
    >
      {loading ? 'Leaving...' : 'Logout'}
    </button>
  )
}
