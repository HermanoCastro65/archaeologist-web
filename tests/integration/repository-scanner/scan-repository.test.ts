import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'
import { randomUUID } from 'crypto'

describe('Repository Scanner', () => {
  it('should clone repository and store files', async () => {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: `${randomUUID()}@test.com`,
        name: 'Scanner User',
      },
    })

    const createRepo = new CreateRepositoryUseCase()

    const repo = await createRepo.execute({
      url: 'https://github.com/octocat/Hello-World',
      userId: user.id,
    })

    const scanner = new ScanRepositoryUseCase()

    const result = await scanner.execute(repo.id)

    const files = await prisma.repositoryFile.findMany({
      where: { repositoryId: repo.id },
    })

    expect(result.filesIndexed).toBeGreaterThan(0)
    expect(files.length).toBeGreaterThan(0)
  })
})
