import { prisma } from '@/lib/db/prisma'
import { Repository } from '../domain/Repository'
import { RepositoryUrl } from '../domain/RepositoryUrl'

interface CreateRepositoryInput {
  url: string
  userId: string
}

export class CreateRepositoryUseCase {
  async execute({ url, userId }: CreateRepositoryInput): Promise<Repository> {
    const repoUrl = new RepositoryUrl(url)

    const existing = await prisma.repository.findFirst({
      where: {
        url: repoUrl.value,
        userId,
      },
    })

    if (existing) {
      return new Repository({
        id: existing.id,
        url: repoUrl,
        userId: existing.userId,
        createdAt: existing.createdAt,
      })
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: `${userId}@placeholder.com`,
      },
    })

    const repository = new Repository({
      url: repoUrl,
      userId,
    })

    await prisma.repository.create({
      data: repository.toJSON(),
    })

    return repository
  }
}
