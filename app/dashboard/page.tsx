'use client'

import { useState } from 'react'
import RepositoryForm from '@/components/dashboard/RepositoryForm'
import ScanResult from '@/components/dashboard/ScanResult'
import { AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  const [result, setResult] = useState<{
    repositoryId: string
    repositoryName: string
    files: number
  } | null>(null)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function scan(url: string) {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/repositories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      let data: any = null

      try {
        data = await res.json()
      } catch {
        throw new Error('Unexpected error')
      }

      if (!res.ok) {
        throw new Error(data?.error ?? 'Failed to scan repository')
      }

      setResult({
        repositoryId: data.repositoryId,
        repositoryName: data.repositoryName,
        files: data.files,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-2">Repository Scanner</h1>

      <p className="text-graySoft mb-6">Scan Git repositories and index their structure</p>

      <RepositoryForm onSubmit={scan} />

      {loading && <p className="text-matrixSoft mt-4 animate-pulse">Scanning repository...</p>}

      <AnimatePresence mode="wait">
        {error && !loading && <p className="text-red-400 mt-4">{error}</p>}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {result && !loading && (
          <div className="mt-6">
            <ScanResult repositoryName={result.repositoryName} files={result.files} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
