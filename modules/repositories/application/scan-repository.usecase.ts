import { prisma } from '@/lib/db/prisma'
import { GitCloneService } from '../infrastructure/git/git-clone.service'
import { WorkspaceManager } from '../infrastructure/workspace/workspace-manager'
import fs from 'fs/promises'

export class ScanRepositoryUseCase {
  async execute(repositoryId: string) {
    const repo = await prisma.repository.findUnique({
      where: { id: repositoryId },
    })

    if (!repo) {
      throw new Error('Repository not found')
    }

    const scan = await prisma.repositoryScan.create({
      data: {
        repositoryId,
        status: 'running',
      },
    })

    const git = new GitCloneService()

    const workspace = await git.cloneRepository(repo.url, repo.id)

    const manager = new WorkspaceManager()

    const files = await manager.listFiles(workspace)

    for (const file of files) {
      const stats = await fs.stat(file)

      await prisma.repositoryFile.create({
        data: {
          repositoryId,
          path: file,
          size: stats.size,
        },
      })
    }

    await prisma.repositoryScan.update({
      where: { id: scan.id },
      data: {
        status: 'finished',
        filesCount: files.length,
        finishedAt: new Date(),
      },
    })

    return {
      scanId: scan.id,
      filesIndexed: files.length,
    }
  }
}
