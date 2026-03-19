'use client'

import { useSession } from 'next-auth/react'

export default function UserAvatar() {
  const { data } = useSession()

  if (!data) return null

  return (
    <div className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-border/40 transition">
      <img
        src={data.user.image!}
        className="w-8 h-8 rounded-full border border-border object-cover"
      />

      <span className="text-sm text-white/90">{data.user.name}</span>
    </div>
  )
}
