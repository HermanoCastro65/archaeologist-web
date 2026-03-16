import { prisma } from '@/lib/db/prisma'
import { Repository } from '../domain/Repository'
import { RepositoryUrl } from '../domain/RepositoryUrl'

export class CreateRepositoryUseCase {
  async execute(input: { url: string }): Promise<Repository> {
    const repoUrl = new RepositoryUrl(input.url)

    const existing = await prisma.repository.findUnique({
      where: { url: repoUrl.value },
    })

    if (existing) {
      return new Repository({
        id: existing.id,
        url: repoUrl,
        createdAt: existing.createdAt,
      })
    }

    const repository = new Repository({
      url: repoUrl,
    })

    try {
      await prisma.repository.create({
        data: {
          id: repository.id,
          url: repository.url.value,
          owner: repository.owner,
          name: repository.name,
          provider: repository.provider,
        },
      })

      return repository
    } catch {
      const repo = await prisma.repository.findUnique({
        where: { url: repoUrl.value },
      })

      if (!repo) {
        throw new Error('Failed to create repository')
      }

      return new Repository({
        id: repo.id,
        url: repoUrl,
        createdAt: repo.createdAt,
      })
    }
  }
}
