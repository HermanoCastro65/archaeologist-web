import { prisma } from '@/lib/db/prisma'
import { GitCloneService } from '../infrastructure/git/git-clone.service'
import { WorkspaceManager } from '../infrastructure/workspace/workspace-manager'

export class ScanRepositoryUseCase {
  async execute(repositoryId: string) {
    const repo = await prisma.repository.findUnique({
      where: { id: repositoryId },
    })

    if (!repo) {
      throw new Error('Repository not found')
    }

    const git = new GitCloneService()

    const workspace = await git.cloneRepository(repo.url, repo.id)

    const workspaceManager = new WorkspaceManager()

    const files = await workspaceManager.listFiles(workspace)

    return {
      repository: repo.id,
      filesIndexed: files.length,
    }
  }
}
