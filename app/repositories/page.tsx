'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'

type Repo = {
  id: string
  owner: string
  name: string
  files: number
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
        setRepos(data)
      }
    } catch {}
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Repositories</h1>
      <p className="text-graySoft mb-8">Access and explore your scanned repositories</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <Link key={repo.id} href={`/repositories/${repo.id}`}>
            <Card className="cursor-pointer hover:scale-[1.02] transition">
              <div className="text-sm text-graySoft mb-2">Repository</div>

              <div className="text-matrix font-mono break-all mb-3">
                {repo.owner}/{repo.name}
              </div>

              <div className="text-xs text-matrixSoft">{repo.files} files indexed</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
