'use client'

import DeleteRepositoryButton from './DeleteRepositoryButton'

export default function RepositoryItem({
  repo,
  reload,
}: {
  repo: { id: string; owner: string; name: string }
  reload: () => void
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-black/40 border border-transparent hover:border-border transition">
      <span className="text-sm text-white truncate">
        {repo.owner}/{repo.name}
      </span>

      <DeleteRepositoryButton id={repo.id} reload={reload} />
    </div>
  )
}
