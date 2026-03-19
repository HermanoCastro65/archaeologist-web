import { describe, it, expect, vi } from 'vitest'
import { GET } from '@/app/api/repositories/[id]/files/route'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { getServerSession } from 'next-auth'

describe('GET /api/repositories/[id]/files', () => {
  it('should return only files from specific repository', async () => {
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

    const repo = await prisma.repository.create({
      data: {
        id: randomUUID(),
        url: 'https://github.com/test/repo',
        owner: 'test',
        name: 'repo',
        provider: 'github',
        userId,
      },
    })

    const scan = await prisma.repositoryScan.create({
      data: {
        repositoryId: repo.id,
        status: 'finished',
        filesCount: 2,
      },
    })

    await prisma.repositoryFile.createMany({
      data: [
        {
          repositoryId: repo.id,
          scanId: scan.id,
          path: '/file1.ts',
          size: 100,
        },
        {
          repositoryId: repo.id,
          scanId: scan.id,
          path: '/file2.ts',
          size: 200,
        },
      ],
    })

    const res = await GET({} as any, {
      params: { id: repo.id },
    })

    const data = await res.json()

    expect(data.length).toBe(2)
  })
})
