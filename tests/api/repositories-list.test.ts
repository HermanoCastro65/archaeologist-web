import { describe, it, expect, vi } from 'vitest'
import { GET } from '@/app/api/repositories/route'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { getServerSession } from 'next-auth'

describe('GET /api/repositories', () => {
  it('should return only valid repositories with files > 0', async () => {
    const userId = randomUUID()

    ;(getServerSession as any).mockResolvedValue({
      user: { id: userId },
    })

    await prisma.user.create({
      data: {
        id: userId,
        email: `${userId}@test.com`,
      },
    })

    const repoValid = await prisma.repository.create({
      data: {
        id: randomUUID(),
        url: 'https://github.com/test/valid',
        owner: 'test',
        name: 'valid',
        provider: 'github',
        userId,
      },
    })

    await prisma.repositoryScan.create({
      data: {
        repositoryId: repoValid.id,
        status: 'finished',
        filesCount: 10,
      },
    })

    const repoInvalid = await prisma.repository.create({
      data: {
        id: randomUUID(),
        url: 'https://github.com/test/invalid',
        owner: 'test',
        name: 'invalid',
        provider: 'github',
        userId,
      },
    })

    await prisma.repositoryScan.create({
      data: {
        repositoryId: repoInvalid.id,
        status: 'finished',
        filesCount: 0,
      },
    })

    const res = await GET()
    const data = await res.json()

    expect(data.length).toBe(1)
    expect(data[0].name).toBe('valid')
    expect(data[0].files).toBe(10)
  })
})
