'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ScanResult from '@/components/dashboard/ScanResult'

type Repo = {
  id: string
  owner: string
  name: string
  files: number
}

export default function RepositoryDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [repo, setRepo] = useState<Repo | null>(null)

  async function load() {
    try {
      const res = await fetch('/api/repositories')
      const data = await res.json()

      const found = data.find((r: Repo) => r.id === id)
      if (found) setRepo(found)
    } catch {}
  }

  useEffect(() => {
    load()
  }, [id])

  if (!repo) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <ScanResult repositoryName={`${repo.owner}/${repo.name}`} files={repo.files} />
    </div>
  )
}
