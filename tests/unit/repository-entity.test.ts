import { describe, it, expect } from 'vitest'
import { Repository } from '@/modules/repositories/domain/Repository'
import { RepositoryUrl } from '@/modules/repositories/domain/RepositoryUrl'

describe('Repository entity', () => {
  it('should create repository with valid props', () => {
    const repo = new Repository({
      url: new RepositoryUrl('https://github.com/vercel/next.js'),
      userId: 'test-user',
    })

    expect(repo.id).toBeDefined()
    expect(repo.url.value).toBe('https://github.com/vercel/next.js')
  })
})
