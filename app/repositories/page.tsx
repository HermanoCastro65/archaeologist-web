'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import RepositoryActions from '@/components/sidebar/RepositoryActions'

type Repo = {
  id: string
  owner: string
  name: string
  files: number
  isArchived?: boolean
}

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<Repo[]>([])

  async function load() {
    try {
      const res = await fetch('/api/repositories', {
        cache: 'no-store',
      })

      if (!res.ok) return

      const data = await res.json()

      if (Array.isArray(data)) {
        setRepos(data.filter((r: Repo) => !r.isArchived))
      }
    } catch {}
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    function handleUpdate(e: any) {
      const { id, type, name } = e.detail || {}

      if (type === 'archive' || type === 'delete') {
        setRepos((prev) => prev.filter((r) => r.id !== id))
      }

      if (type === 'unarchive') {
        load()
      }

      if (type === 'rename') {
        setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, name } : r)))
      }
    }

    window.addEventListener('repository:updated', handleUpdate)

    return () => {
      window.removeEventListener('repository:updated', handleUpdate)
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Repositories</h1>
      <p className="text-graySoft mb-8">Access and explore your scanned repositories</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div key={repo.id} className="relative">
            <Link href={`/repositories/${repo.id}`}>
              <Card className="cursor-pointer hover:scale-[1.02] transition">
                <div className="text-sm text-graySoft mb-2">Repository</div>

                <div className="text-matrix font-mono break-all mb-3">
                  {repo.owner}/{repo.name}
                </div>

                <div className="text-xs text-matrixSoft">{repo.files} files indexed</div>
              </Card>
            </Link>

            <div className="absolute top-3 right-3">
              <RepositoryActions id={repo.id} reload={load} isArchived={repo.isArchived} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
