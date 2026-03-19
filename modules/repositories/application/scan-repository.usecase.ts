import { prisma } from '@/lib/db/prisma'
import { GitCloneService } from '../infrastructure/git/git-clone.service'
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

    try {
      const git = new GitCloneService()
      const workspace = await git.cloneRepository(repo.url, repo.id)

      let files: string[] = []

      try {
        files = await git.listTrackedFiles(workspace)
      } catch {
        files = []
      }

      const data = await Promise.all(
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

      await prisma.repositoryFile.deleteMany({
        where: { repositoryId },
      })

      if (data.length) {
        await prisma.repositoryFile.createMany({
          data,
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

      return {
        scanId: scan.id,
        filesIndexed: 0,
      }
    }
  }
}
