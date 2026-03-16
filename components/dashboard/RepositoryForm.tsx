'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function RepositoryForm({ onScan }: { onScan: (url: string) => void }) {
  const [url, setUrl] = useState('')

  return (
    <div className="flex gap-3">
      <Input
        placeholder="https://github.com/user/repository"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={() => onScan(url)}>Scan</Button>
    </div>
  )
}
