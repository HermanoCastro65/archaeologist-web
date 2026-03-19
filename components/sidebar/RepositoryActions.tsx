'use client'

import { useState, useRef, useEffect } from 'react'

export default function RepositoryActions({ id, reload }: { id: string; reload: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  async function handleDelete() {
    await fetch(`/api/repositories/${id}`, {
      method: 'DELETE',
    })
    reload()
    setOpen(false)
  }

  function handleRename() {
    setOpen(false)
  }

  function handleArchive() {
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
        onClick={() => setOpen((v) => !v)}
        className="text-graySoft hover:text-white px-2 py-1 rounded transition"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-panel border border-border rounded-md shadow-lg z-50">
          <button
            onClick={handleRename}
            className="w-full text-left px-3 py-2 text-sm hover:bg-border/40 transition"
          >
            Rename
          </button>

          <button
            onClick={handleArchive}
            className="w-full text-left px-3 py-2 text-sm hover:bg-border/40 transition"
          >
            Archive
          </button>

          <button
            onClick={handleDelete}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
