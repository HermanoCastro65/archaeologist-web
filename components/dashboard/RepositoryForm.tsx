'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function RepositoryForm({ onSubmit }: { onSubmit: (url: string) => Promise<void> }) {
  const [url, setUrl] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!url) return

    await onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-3">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/user/repository"
      />

      <Button type="submit">Scan</Button>
    </form>
  )
}
