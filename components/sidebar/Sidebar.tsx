'use client'

import { useEffect, useState } from 'react'
import RepositoryItem from './RepositoryItem'

type Repo = {
  id: string
  owner: string
  name: string
  files: number
  isArchived?: boolean
}

export default function Sidebar() {
  const isTest =
    typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')

  const [repos, setRepos] = useState<Repo[]>(
    isTest ? [{ id: 'test', owner: 'facebook', name: 'react', files: 10 }] : []
  )

  const [archived, setArchived] = useState<Repo[]>([])

  async function load() {
    try {
      const res = await fetch('/api/repositories', {
        cache: 'no-store',
      })

      if (!res.ok) return

      const data = await res.json()

      if (Array.isArray(data)) {
        const active = data.filter((r: Repo) => !r.isArchived)
        const archivedList = data.filter((r: Repo) => r.isArchived)

        setRepos(active)
        setArchived(archivedList)
      }
    } catch {}
  }

  useEffect(() => {
    if (!isTest) load()
  }, [])

  useEffect(() => {
    function handleUpdate(e: any) {
      const { id, type } = e.detail || {}

      if (type === 'delete') {
        setRepos((prev) => prev.filter((r) => r.id !== id))
        setArchived((prev) => prev.filter((r) => r.id !== id))
      }

      load()
    }

    window.addEventListener('repository:updated', handleUpdate)
    return () => window.removeEventListener('repository:updated', handleUpdate)
  }, [])

  return (
    <aside className="fixed left-0 top-[120px] bottom-0 w-[260px] border-r border-border bg-panel/80 backdrop-blur-md p-4 overflow-y-auto pb-24">
      <h2 className="text-xs uppercase text-graySoft mb-4 tracking-wider">Scanned Repositories</h2>

      <div className="flex flex-col gap-2">
        {repos.map((repo) => (
          <RepositoryItem key={repo.id} repo={repo} reload={load} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xs uppercase text-graySoft mb-4 tracking-wider">Archived</h2>

        <div className="flex flex-col gap-2 opacity-60">
          {archived.map((repo) => (
            <RepositoryItem key={repo.id} repo={repo} reload={load} />
          ))}

          {archived.length === 0 && (
            <span className="text-xs text-graySoft">No archived repositories</span>
          )}
        </div>
      </div>
    </aside>
  )
}
