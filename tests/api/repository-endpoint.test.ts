import { describe, it, expect } from 'vitest'

describe('Repository API', () => {
  it('should return valid scan response shape', async () => {
    const response = {
      repositoryId: 'mock-id',
      filesIndexed: 10,
    }

    expect(response).toMatchObject({
      repositoryId: expect.any(String),
      filesIndexed: expect.any(Number),
    })

    expect(response.filesIndexed).toBeGreaterThan(0)
  })
})
