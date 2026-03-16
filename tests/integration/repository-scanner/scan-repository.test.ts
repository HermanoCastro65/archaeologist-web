import { describe, it, expect } from 'vitest'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'

describe('Repository Scanner', () => {
  it('should clone and index repository files', async () => {
    const create = new CreateRepositoryUseCase()

    const repo = await create.execute({
      url: 'https://github.com/octocat/Hello-World',
    })

    const scanner = new ScanRepositoryUseCase()

    const result = await scanner.execute(repo.id)

    expect(result.filesIndexed).toBeGreaterThan(0)
  })
})
