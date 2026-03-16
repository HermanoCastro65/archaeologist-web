'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LoginButton from '../LoginButton'
import LogoutButton from '../LogoutButton'
import UserAvatar from './UserAvatar'

export default function Navbar() {
  const { data } = useSession()

  return (
    <header className="border-b border-border bg-panel">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 font-semibold text-matrix">Archaeologist</div>

        <nav className="flex items-center gap-6 text-sm text-graySoft">
          <Link href="/" className="hover:text-white">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>

          <Link href="/repositories" className="hover:text-white">
            Repositories
          </Link>

          {data ? (
            <div className="flex items-center gap-4">
              <UserAvatar />
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </nav>
      </div>
    </header>
  )
}
