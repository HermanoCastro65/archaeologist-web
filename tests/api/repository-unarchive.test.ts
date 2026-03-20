import { describe, it, expect, vi } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { randomUUID } from 'crypto'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { PATCH } from '@/app/api/repositories/[id]/unarchive/route'

describe('PATCH /api/repositories/[id]/unarchive', () => {
  it('should unarchive repository', async () => {
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
        isArchived: true,
      },
    })

    const res = await PATCH({} as any, {
      params: Promise.resolve({ id: repo.id }),
    })

    const data = await res.json()

    expect(data.isArchived).toBe(false)

    const updated = await prisma.repository.findUnique({
      where: { id: repo.id },
    })

    expect(updated?.isArchived).toBe(false)
  })
})
