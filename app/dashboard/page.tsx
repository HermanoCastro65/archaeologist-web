'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import RepositoryForm from '@/components/dashboard/RepositoryForm'
import ScanResult from '@/components/dashboard/ScanResult'

export default function Dashboard() {
  const { data: session } = useSession()

  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function scan(url: string) {
    setError(null)

    const res = await fetch('/api/repositories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ url }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      setError(data.error ?? 'Failed to scan repository')
      return
    }

    setResult({
      repositoryId: data.repositoryId,
      files: data.files,
    })
  }

  if (!session) return null

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-matrix">Repository Scanner</h1>

        <p className="text-graySoft mt-2">Scan Git repositories and index their structure</p>
      </div>

      <RepositoryForm onScan={scan} />

      {error && <div className="text-red-400 text-sm font-medium">{error}</div>}

      {result && <ScanResult repositoryId={result.repositoryId} files={result.files} />}
    </div>
  )
}
