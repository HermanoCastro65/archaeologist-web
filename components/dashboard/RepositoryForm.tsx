'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function RepositoryForm({ onScan }: { onScan: (url: string) => Promise<void> }) {
  const [url, setUrl] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!url) return

    await onScan(url)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/user/repository"
      />

      <Button type="submit">Scan</Button>
    </form>
  )
}
