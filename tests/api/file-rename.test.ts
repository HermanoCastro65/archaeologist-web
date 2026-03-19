import { describe, it, expect, vi } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { getServerSession } from 'next-auth'
import { PATCH } from '@/app/api/repositories/[id]/rename/route'

describe('PATCH /api/files/[id]/rename', () => {
  it('should rename file', async () => {
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
        path: '/old.ts',
        size: 100,
      },
    })

    const req = new Request('http://localhost', {
      method: 'PATCH',
      body: JSON.stringify({ path: '/new.ts' }),
    })

    const res = await PATCH(req, { params: { id: file.id } })
    const data = await res.json()

    expect(data.path).toBe('/new.ts')
  })
})
