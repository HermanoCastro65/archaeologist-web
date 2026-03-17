import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

describe('Repository History', () => {
  it('should store repository scan', async () => {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: `${randomUUID()}@test.com`,
        name: 'Test User',
      },
    })

    const repo = await prisma.repository.create({
      data: {
        url: `https://github.com/test/repo-${randomUUID()}`,
        owner: 'test',
        name: 'repo',
        provider: 'github',
        userId: user.id,
      },
    })

    expect(repo.id).toBeDefined()
  })

  it('should delete repository', async () => {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: `${randomUUID()}@delete.com`,
        name: 'Delete User',
      },
    })

    const repo = await prisma.repository.create({
      data: {
        url: `https://github.com/delete/repo-${randomUUID()}`,
        owner: 'delete',
        name: 'repo',
        provider: 'github',
        userId: user.id,
      },
    })

    await prisma.repository.delete({
      where: { id: repo.id },
    })

    const deleted = await prisma.repository.findUnique({
      where: { id: repo.id },
    })

    expect(deleted).toBeNull()
  })
})
