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

    let workspace = ''

    try {
      const git = new GitCloneService()

      workspace = await git.cloneRepository(repo.url, repo.id)

      const manager = new WorkspaceManager()

      const files = await manager.listFiles(workspace)

      const batch = await Promise.all(
        files.map(async (file) => {
          const stats = await fs.stat(file)
          return {
            repositoryId,
            scanId: scan.id,
            path: file,
            size: stats.size,
          }
        })
      )

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
          filesCount: files.length,
          finishedAt: new Date(),
        },
      })

      return {
        scanId: scan.id,
        filesIndexed: files.length,
      }
    } catch {
      await prisma.repositoryScan.update({
        where: { id: scan.id },
        data: {
          status: 'failed',
          finishedAt: new Date(),
        },
      })

      throw new Error('Repository not found or cannot be cloned')
    } finally {
      if (workspace) {
        await fs.rm(workspace, { recursive: true, force: true })
      }
    }
  }
}
