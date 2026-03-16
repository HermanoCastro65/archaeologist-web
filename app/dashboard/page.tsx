'use client'

import { useState } from 'react'

export default function Dashboard() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function scanRepository() {
    setLoading(true)

    const res = await fetch('/api/repositories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    const data = await res.json()

    setResult(data)

    setLoading(false)
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Archaeologist Repository Scanner</h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="https://github.com/user/repo"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={scanRepository} className="bg-black text-white px-6 py-3">
        {loading ? 'Scanning...' : 'Scan Repository'}
      </button>

      {result && (
        <div className="mt-6 border p-4">
          <p>
            Repository ID:
            <br />
            {result.repositoryId}
          </p>

          <p className="mt-2">Files Indexed: {result.filesIndexed}</p>
        </div>
      )}
    </div>
  )
}
