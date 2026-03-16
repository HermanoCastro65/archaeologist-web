'use client'

import { useState } from 'react'
import RepositoryForm from '@/components/dashboard/RepositoryForm'
import ScanResult from '@/components/dashboard/ScanResult'

export default function Dashboard() {
  const [result, setResult] = useState<any>(null)

  async function scan(url: string) {
    const res = await fetch('/api/repositories', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    setResult(data)
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-matrix">Repository Scanner</h1>

        <p className="text-graySoft mt-2">Scan Git repositories and index their structure</p>
      </div>

      <RepositoryForm onScan={scan} />

      {result && <ScanResult repositoryId={result.repositoryId} files={result.files} />}
    </div>
  )
}
