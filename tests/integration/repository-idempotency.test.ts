import { describe, it, expect } from 'vitest'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'

describe('Repository creation', () => {
  it('should not duplicate repositories', async () => {
    const usecase = new CreateRepositoryUseCase()

    const repo1 = await usecase.execute({
      url: 'https://github.com/facebook/react',
    })

    const repo2 = await usecase.execute({
      url: 'https://github.com/facebook/react',
    })

    expect(repo1.id).toBe(repo2.id)
  })
})
