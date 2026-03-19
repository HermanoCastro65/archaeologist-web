import { describe, it, expect, vi } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { getServerSession } from 'next-auth'
import { DELETE } from '@/app/api/files/[id]/delete/route'

describe('DELETE /api/files/[id]/delete', () => {
  it('should delete file', async () => {
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
        filesCount: 1,
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

    const req = new Request('http://localhost', {
      method: 'DELETE',
    })

    await DELETE(req, { params: { id: file.id } })

    const deleted = await prisma.repositoryFile.findUnique({
      where: { id: file.id },
    })

    expect(deleted).toBeNull()
  })
})
