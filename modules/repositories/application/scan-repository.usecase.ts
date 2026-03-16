import { prisma } from '@/lib/db/prisma'
import { GitCloneService } from '../infrastructure/git/git-clone.service'
import { WorkspaceManager } from '../infrastructure/workspace/workspace-manager'
import fs from 'fs/promises'
import path from 'path'

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

    const batch = []

    for (const file of files) {
      const stats = await fs.stat(file)

      batch.push({
        repositoryId,
        scanId: scan.id,
        path: path.relative(workspace, file),
        size: stats.size,
      })
    }

    if (batch.length > 0) {
      await prisma.repositoryFile.createMany({
        data: batch,
        skipDuplicates: true,
      })
    }

    await prisma.repositoryScan.update({
      where: { id: scan.id },
      data: {
        status: 'finished',
        filesCount: batch.length,
        finishedAt: new Date(),
      },
    })

    return {
      scanId: scan.id,
      filesIndexed: batch.length,
    }
  }
}
