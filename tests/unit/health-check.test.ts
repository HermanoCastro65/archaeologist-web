import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db/prisma'

describe('database', () => {
  it('should write and read health check', async () => {
    const result = await prisma.healthCheck.create({
      data: { message: 'test' },
    })

    expect(result.message).toBe('test')
  })
})
