import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { randomUUID } from 'crypto'

describe('CreateRepositoryUseCase', () => {
  it('should create repository in database', async () => {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: `${randomUUID()}@test.com`,
        name: 'Test User',
      },
    })

    const usecase = new CreateRepositoryUseCase()

    const repo = await usecase.execute({
      url: 'https://github.com/nodejs/node',
      userId: user.id,
    })

    expect(repo.id).toBeDefined()
  })
})
