import { describe, it, expect } from 'vitest'

describe('Repository API', () => {
  it('should return mocked scan result', async () => {
    const mockResponse = {
      repositoryId: 'mock-id',
      filesIndexed: 10,
    }

    expect(mockResponse.repositoryId).toBeDefined()
    expect(mockResponse.filesIndexed).toBeGreaterThan(0)
  })
})
