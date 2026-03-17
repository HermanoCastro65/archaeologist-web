'use client'

import { useEffect, useState } from 'react'
import RepositoryItem from './RepositoryItem'

type Repo = {
  id: string
  owner: string
  name: string
}

export default function Sidebar() {
  const [repos, setRepos] = useState<Repo[]>([])

  async function load() {
    const res = await fetch('/api/repositories', {
      credentials: 'include',
    })

    if (!res.ok) return

    const data = await res.json()
    setRepos(data)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <aside className="fixed left-0 top-[120px] bottom-0 w-[260px] border-r border-border bg-panel/80 backdrop-blur-md p-4 overflow-y-auto">
      <h2 className="text-xs uppercase text-graySoft mb-4 tracking-wider">Scanned Repositories</h2>

      <div className="flex flex-col gap-2">
        {repos.map((repo) => (
          <RepositoryItem key={repo.id} repo={repo} reload={load} />
        ))}
      </div>
    </aside>
  )
}
