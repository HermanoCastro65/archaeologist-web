'use client'

import RepositoryActions from './RepositoryActions'

export default function RepositoryItem({
  repo,
  reload,
}: {
  repo: { id: string; owner: string; name: string; files: number }
  reload: () => void
}) {
  return (
    <div className="group flex items-center justify-between px-3 py-2 rounded-md border border-transparent hover:border-border hover:bg-black/40 transition">
      <div className="flex flex-col">
        <span className="text-sm text-white truncate">
          {repo.owner}/{repo.name}
        </span>

        <span className="text-xs text-matrix">{repo.files} files</span>
      </div>

      <RepositoryActions id={repo.id} reload={reload} />
    </div>
  )
}
