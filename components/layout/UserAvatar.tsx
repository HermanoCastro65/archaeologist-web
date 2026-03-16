'use client'

import { useSession } from 'next-auth/react'

export default function UserAvatar() {
  const { data } = useSession()

  if (!data) return null

  return (
    <div className="flex items-center gap-2">
      <img src={data.user.image!} className="w-8 h-8 rounded-full" />
      <span>{data.user.name}</span>
    </div>
  )
}
