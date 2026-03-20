import { describe, it, expect, vi } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { DELETE } from '@/app/api/repositories/[id]/delete/route'

describe('DELETE /api/files/[id]/delete', () => {
  it('should delete file', async () => {
    const userId = randomUUID()

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
        userId,
      },
    })

    const scan = await prisma.repositoryScan.create({
      data: {
        repositoryId: repo.id,
        status: 'finished',
      },
    })

    const file = await prisma.repositoryFile.create({
      data: {
        repositoryId: repo.id,
        scanId: scan.id,
        path: '/file.ts',
        size: 100,
      },
    })

    const res = await DELETE({} as any, {
      params: Promise.resolve({ id: file.id }),
    })

    const data = await res.json()

    expect(data.success).toBe(true)

    const exists = await prisma.repositoryFile.findUnique({
      where: { id: file.id },
    })

    expect(exists).toBeNull()
  })
})
