'use client'

import { useState, useRef, useEffect } from 'react'

export default function FileActions({
  fileId,
  reload,
}: {
  fileId: string
  reload: () => Promise<void> | void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  async function handleDelete() {
    const res = await fetch(`/api/files/${fileId}/delete`, {
      method: 'DELETE',
    })

    if (res.ok) {
      await reload()
    }

    setOpen(false)
  }

  async function handleArchive() {
    const res = await fetch(`/api/files/${fileId}/archive`, {
      method: 'PATCH',
    })

    if (res.ok) {
      await reload()
    }

    setOpen(false)
  }

  async function handleRename() {
    const newName = window.prompt('Rename file')

    if (!newName) return

    const res = await fetch(`/api/files/${fileId}/rename`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: newName }),
    })

    if (res.ok) {
      await reload()
    }

    setOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-graySoft hover:text-white text-sm px-1"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 bottom-6 w-36 bg-panel border border-border rounded-md shadow-lg z-50 overflow-hidden">
          <button
            onClick={handleRename}
            className="w-full text-left px-3 py-2 text-sm hover:bg-black/40"
          >
            Rename
          </button>

          <button
            onClick={handleArchive}
            className="w-full text-left px-3 py-2 text-sm hover:bg-black/40"
          >
            Archive
          </button>

          <button
            onClick={handleDelete}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-black/40"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
