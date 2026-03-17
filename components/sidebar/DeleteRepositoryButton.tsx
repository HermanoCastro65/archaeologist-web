'use client'

export default function DeleteRepositoryButton({ id, reload }: { id: string; reload: () => void }) {
  async function handleDelete() {
    await fetch(`/api/repositories/${id}`, {
      method: 'DELETE',
    })

    reload()
  }

  return (
    <button onClick={handleDelete} className="text-red-400 hover:text-red-300 text-xs">
      ✕
    </button>
  )
}
