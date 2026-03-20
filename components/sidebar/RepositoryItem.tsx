'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RepositoryActions from './RepositoryActions'

export default function RepositoryItem({
  repo,
  reload,
}: {
  repo: { id: string; owner: string; name: string; files: number; isArchived?: boolean }
  reload: () => void
}) {
  const isTest =
    typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')

  const router = isTest ? null : useRouter()

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(repo.name)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    function handleUpdate(e: any) {
      const { id, type, name: newName } = e.detail || {}

      if (id !== repo.id) return

      if (type === 'rename' && newName) {
        setName(newName)
      }

      if (type === 'archive') {
        setHidden(true)
      }

      if (type === 'unarchive') {
        setHidden(false)
      }

      if (type === 'delete') {
        setHidden(true)
      }
    }

    function handleStartRename(e: any) {
      if (e.detail?.id === repo.id) {
        setEditing(true)
      }
    }

    window.addEventListener('repository:updated', handleUpdate)
    window.addEventListener('repository:start-rename', handleStartRename)

    return () => {
      window.removeEventListener('repository:updated', handleUpdate)
      window.removeEventListener('repository:start-rename', handleStartRename)
    }
  }, [repo.id])

  async function save() {
    const res = await fetch(`/api/repositories/${repo.id}/rename`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    if (!res.ok) return

    const data = await res.json()

    window.dispatchEvent(
      new CustomEvent('repository:updated', {
        detail: {
          id: repo.id,
          type: 'rename',
          name: data.name,
        },
      })
    )

    setEditing(false)
  }

  if (hidden) return null

  return (
    <div
      onClick={() => {
        if (!editing && router) {
          router.push(`/repositories/${repo.id}`)
        }
      }}
      className="group relative flex flex-col px-3 py-2 rounded-md border border-transparent hover:border-border hover:bg-black/40 transition cursor-pointer"
    >
      {editing ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
          }}
          onClick={(e) => e.stopPropagation()}
          className="text-sm bg-transparent border-b border-matrix outline-none"
        />
      ) : (
        <span className="text-sm text-white break-words leading-snug pr-6">
          {repo.owner}/{name}
        </span>
      )}

      <span className="text-xs text-matrix mt-1">{repo.files} files</span>

      <div
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
        onClick={(e) => e.stopPropagation()}
      >
        <RepositoryActions id={repo.id} reload={reload} isArchived={repo.isArchived} />
      </div>
    </div>
  )
}
