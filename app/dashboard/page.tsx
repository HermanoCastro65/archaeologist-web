'use client'

import { useState } from 'react'
import RepositoryForm from '@/components/dashboard/RepositoryForm'

export default function DashboardPage() {
  const [result, setResult] = useState<{
    repositoryId: string
    repositoryName: string
    files: number
  } | null>(null)

  const [error, setError] = useState<string | null>(null)

  async function scan(url: string) {
    setError(null)
    setResult(null)

    const res = await fetch('/api/repositories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    let data: any = null

    try {
      data = await res.json()
    } catch {
      setError('Unexpected error')
      return
    }

    if (!res.ok) {
      setError(data?.error ?? 'Failed to scan repository')
      return
    }

    setResult({
      repositoryId: data.repositoryId,
      repositoryName: data.repositoryName,
      files: data.files,
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-2">Repository Scanner</h1>

      <p className="text-graySoft mb-6">Scan Git repositories and index their structure</p>

      <RepositoryForm onSubmit={scan} />

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 border border-border rounded-lg p-6 bg-panel/40">
          <p className="text-sm text-graySoft mb-1">Repository</p>
          <p className="text-primary font-mono mb-4">{result.repositoryName}</p>

          <p className="text-sm text-graySoft mb-1">Files indexed</p>
          <p className="text-primary text-xl font-bold">{result.files}</p>
        </div>
      )}
    </div>
  )
}
