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
      <div className="relative w-full flex items-center min-h-[140px]">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
          <Image
            src="/logo-pixel-art.png"
            width={400}
            height={360}
            alt="Archaeologist logo"
            priority
          />
        </div>

        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <Link href="/" className="text-matrix font-bold text-2xl tracking-wide">
            Archaeologist
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
      </div>
    </header>
  )
}
