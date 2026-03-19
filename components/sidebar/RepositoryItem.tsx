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
    <div className="group relative flex flex-col px-3 py-2 rounded-md border border-transparent hover:border-border hover:bg-black/40 transition">
      <span className="text-sm text-white break-words leading-snug pr-6">
        {repo.owner}/{repo.name}
      </span>

      <span className="text-xs text-matrix mt-1">{repo.files} files</span>

      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
        <RepositoryActions id={repo.id} reload={reload} />
      </div>
    </div>
  )
}
