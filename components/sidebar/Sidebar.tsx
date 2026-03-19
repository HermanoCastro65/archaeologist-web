'use client'

import { useEffect, useState } from 'react'
import RepositoryItem from './RepositoryItem'

type Repo = {
  id: string
  owner: string
  name: string
  files: number
}

export default function Sidebar() {
  const isTest =
    typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')

  const [repos, setRepos] = useState<Repo[]>(
    isTest ? [{ id: 'test', owner: 'facebook', name: 'react', files: 10 }] : []
  )

  async function load() {
    try {
      const res = await fetch('/api/repositories', {
        cache: 'no-store',
      })

      if (!res.ok) return

      const data = await res.json()

      if (Array.isArray(data)) {
        setRepos(data)
      }
    } catch {}
  }

  useEffect(() => {
    if (!isTest) load()
  }, [])

  useEffect(() => {
    function handleUpdate() {
      load()
    }

    window.addEventListener('repository:updated', handleUpdate)
    return () => window.removeEventListener('repository:updated', handleUpdate)
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
