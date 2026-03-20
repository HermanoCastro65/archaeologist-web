'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ScanResult from '@/components/dashboard/ScanResult'

type Repo = {
  id: string
  owner: string
  name: string
  files: number
  isArchived?: boolean
}

export default function RepositoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [repo, setRepo] = useState<Repo | null>(null)

  async function load() {
    try {
      const res = await fetch('/api/repositories', { cache: 'no-store' })
      if (!res.ok) return

      const data = await res.json()

      const found = data.find((r: Repo) => r.id === id)

      if (found) setRepo(found)
      else setRepo(null)
    } catch {}
  }

  useEffect(() => {
    load()
  }, [id])

  useEffect(() => {
    function handleUpdate(e: any) {
      const { id: updatedId, type, name } = e.detail || {}

      if (updatedId !== id) return

      if (type === 'archive' || type === 'delete') {
        setRepo(null)
        router.push('/repositories')
      }

      if (type === 'rename') {
        setRepo((prev) => (prev ? { ...prev, name } : prev))
      }
    }

    window.addEventListener('repository:updated', handleUpdate)

    return () => {
      window.removeEventListener('repository:updated', handleUpdate)
    }
  }, [id, router])

  if (!repo) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <ScanResult repositoryName={`${repo.owner}/${repo.name}`} files={repo.files} />
    </div>
  )
}
