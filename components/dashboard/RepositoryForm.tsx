'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function RepositoryForm({ onSubmit }: { onSubmit: (url: string) => Promise<void> }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url || loading) return

    setLoading(true)
    try {
      await onSubmit(url)
      window.dispatchEvent(new Event('repository:updated'))
      setUrl('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-3 items-center">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/user/repository"
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Scanning...' : 'Scan'}
      </Button>
    </form>
  )
}
