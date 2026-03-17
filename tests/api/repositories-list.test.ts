import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db/prisma'

describe('Repository API', () => {
  it('should list repositories', async () => {
    const repos = await prisma.repository.findMany()

    expect(Array.isArray(repos)).toBe(true)
  })
})
