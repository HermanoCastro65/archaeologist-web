import { describe, it, expect } from 'vitest'
import { RepositoryUrl } from '@/modules/repositories/domain/RepositoryUrl'

describe('RepositoryUrl', () => {
  it('should normalize git urls', () => {
    const url = new RepositoryUrl('https://github.com/vercel/next.js.git')

    expect(url.value).toBe('https://github.com/vercel/next.js')
  })

  it('should extract owner and repo', () => {
    const url = new RepositoryUrl('https://github.com/nodejs/node')

    expect(url.owner).toBe('nodejs')
    expect(url.name).toBe('node')
  })

  it('should reject invalid urls', () => {
    expect(() => {
      new RepositoryUrl('invalid-url')
    }).toThrow()
  })

  it('should normalize trailing slash', () => {
    const url = new RepositoryUrl('https://github.com/vercel/next.js/')

    expect(url.value).toBe('https://github.com/vercel/next.js')
  })
})
