'use client'

import { useState, useRef, useEffect } from 'react'

export default function RepositoryActions({
  id,
  reload,
  isArchived,
}: {
  id: string
  reload: () => void
  isArchived?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  async function handleArchive() {
    const res = await fetch(`/api/repositories/${id}/archive`, {
      method: 'PATCH',
    })

    if (!res.ok) return

    const data = await res.json()

    window.dispatchEvent(
      new CustomEvent('repository:updated', {
        detail: {
          id,
          type: 'archive',
          isArchived: data.isArchived,
        },
      })
    )

    setOpen(false)
  }

  async function handleUnarchive() {
    const res = await fetch(`/api/repositories/${id}/unarchive`, {
      method: 'PATCH',
    })

    if (!res.ok) return

    window.dispatchEvent(
      new CustomEvent('repository:updated', {
        detail: { id, type: 'unarchive' },
      })
    )

    setOpen(false)
  }

  async function handleDelete() {
    const res = await fetch(`/api/repositories/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) return

    window.dispatchEvent(
      new CustomEvent('repository:updated', {
        detail: { id, type: 'delete' },
      })
    )

    reload()
    setOpen(false)
  }

  function handleRename() {
    window.dispatchEvent(
      new CustomEvent('repository:start-rename', {
        detail: { id },
      })
    )

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
    <div className="relative z-[9999]" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-graySoft hover:text-white text-sm px-1"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 top-6 w-36 bg-panel border border-border rounded-md shadow-lg z-[9999] overflow-hidden">
          {!isArchived ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleUnarchive}
              className="w-full text-left px-3 py-2 text-sm hover:bg-black/40"
            >
              Unarchive
            </button>
          )}

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
