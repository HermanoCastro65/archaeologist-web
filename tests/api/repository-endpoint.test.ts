import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/repositories/route'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

import { getServerSession } from 'next-auth'

describe('POST /api/repositories', () => {
  it('should create and scan repository successfully', async () => {
    ;(getServerSession as any).mockResolvedValue({
      user: { id: 'user-1' },
    })

    vi.spyOn(CreateRepositoryUseCase.prototype, 'execute').mockResolvedValue({
      id: 'repo-1',
      fullName: 'test/repo',
    } as any)

    vi.spyOn(ScanRepositoryUseCase.prototype, 'execute').mockResolvedValue({
      filesIndexed: 5,
    } as any)

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://github.com/test/repo' }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.files).toBe(5)
  })

  it('should reject invalid repository (files = 0)', async () => {
    ;(getServerSession as any).mockResolvedValue({
      user: { id: 'user-1' },
    })

    vi.spyOn(CreateRepositoryUseCase.prototype, 'execute').mockResolvedValue({
      id: 'repo-2',
      fullName: 'test/invalid',
    } as any)

    vi.spyOn(ScanRepositoryUseCase.prototype, 'execute').mockResolvedValue({
      filesIndexed: 0,
    } as any)

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://github.com/test/invalid' }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBeDefined()
  })
})
