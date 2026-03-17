import { prisma } from '@/lib/db/prisma'
import { Repository } from '../domain/Repository'
import { RepositoryUrl } from '../domain/RepositoryUrl'

interface CreateRepositoryInput {
  url: string
  userId: string
}

export class CreateRepositoryUseCase {
  async execute(input: CreateRepositoryInput): Promise<Repository> {
    const repoUrl = new RepositoryUrl(input.url)

    const existing = await prisma.repository.findFirst({
      where: {
        url: repoUrl.value,
        userId: input.userId,
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
      where: { id: input.userId },
      update: {},
      create: {
        id: input.userId,
        email: `${input.userId}@placeholder.com`,
      },
    })

    const repository = new Repository({
      url: repoUrl,
      userId: input.userId,
    })

    await prisma.repository.create({
      data: {
        id: repository.id,
        url: repository.url.value,
        owner: repository.owner,
        name: repository.name,
        provider: repository.provider,
        userId: input.userId,
      },
    })

    return repository
  }
}
