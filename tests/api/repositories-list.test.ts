import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '@/app/api/repositories/route'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'
import { resetDatabase } from '../utils/reset-db'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { getServerSession } from 'next-auth'

describe('GET /api/repositories', () => {
  beforeEach(async () => {
    await resetDatabase()
  })

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

    const scanValid = await prisma.repositoryScan.create({
      data: {
        repositoryId: repoValid.id,
        status: 'finished',
        filesCount: 10,
      },
    })

    await prisma.repositoryFile.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        repositoryId: repoValid.id,
        scanId: scanValid.id,
        path: `/file-${i}.ts`,
        size: 100,
      })),
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

    const scanInvalid = await prisma.repositoryScan.create({
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
