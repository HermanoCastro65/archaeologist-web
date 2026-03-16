'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import LoginButton from '../LoginButton'
import LogoutButton from '../LogoutButton'
import UserAvatar from './UserAvatar'

export default function Navbar() {
  const { data } = useSession()

  return (
    <header className="border-b border-border bg-panel">
      <div className="max-w-6xl mx-auto pl-2 pr-6 flex items-center justify-between h-[120px]">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/logo-pixel-art.png"
            alt="Archaeologist logo"
            width={600}
            height={520}
            priority
            className="h-[200px] w-auto object-contain -ml-6"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm text-graySoft">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>

          <Link href="/repositories" className="hover:text-white transition">
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
