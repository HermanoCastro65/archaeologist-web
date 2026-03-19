'use client'

import { useState, useEffect, useRef } from 'react'
import RepositoryActions from './RepositoryActions'

export default function RepositoryItem({
  repo,
  reload,
}: {
  repo: { id: string; owner: string; name: string; files: number; isArchived?: boolean }
  reload: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(repo.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(repo.name)
  }, [repo.name])

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent
      if (custom.detail?.id === repo.id) {
        setEditing(true)
        setTimeout(() => {
          inputRef.current?.focus()
          inputRef.current?.select()
        }, 0)
      }
    }

    window.addEventListener('repository:start-rename', handler as EventListener)

    return () => {
      window.removeEventListener('repository:start-rename', handler as EventListener)
    }
  }, [repo.id])

  async function save() {
    if (!value || value === repo.name) {
      setEditing(false)
      return
    }

    const res = await fetch(`/api/repositories/${repo.id}/rename`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: value }),
    })

    if (res.ok) {
      window.dispatchEvent(new Event('repository:updated'))
      reload()
    }

    setEditing(false)
  }

  return (
    <div className="group relative flex flex-col px-3 py-2 rounded-md border border-transparent hover:border-border hover:bg-black/40 transition">
      {editing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              save()
            }
            if (e.key === 'Escape') setEditing(false)
          }}
          className="text-sm bg-transparent outline-none border border-border px-2 py-1 rounded"
        />
      ) : (
        <span className="text-sm text-white break-words leading-snug pr-6">
          {repo.owner}/{value}
        </span>
      )}

      <span className="text-xs text-matrix mt-1">{repo.files} files</span>

      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
        <RepositoryActions id={repo.id} reload={reload} isArchived={repo.isArchived} />
      </div>
    </div>
  )
}
