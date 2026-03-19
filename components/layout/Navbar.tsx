'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import LoginButton from '../LoginButton'
import LogoutButton from '../LogoutButton'
import UserAvatar from './UserAvatar'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { data } = useSession()

  return (
    <header className="border-b border-border bg-panel/80 backdrop-blur supports-[backdrop-filter]:bg-panel/60">
      <div className="max-w-6xl mx-auto pl-2 pr-6 flex items-center justify-between h-[120px]">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/logo-pixel-art.png"
            alt="Archaeologist logo"
            width={600}
            height={520}
            priority
            className="h-[200px] w-auto object-contain -ml-12"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm text-graySoft">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/repositories">Repositories</NavLink>

          {data ? (
            <div className="flex items-center gap-4 pl-2 border-l border-border">
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        'relative transition-colors duration-200 hover:text-white',
        'after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-matrix',
        'hover:after:w-full after:transition-all after:duration-300'
      )}
    >
      {children}
    </Link>
  )
}
