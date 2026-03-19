import { describe, it, expect } from 'vitest'
import { File } from '@/modules/file/domain/File'

describe('File entity', () => {
  it('should create file with valid props', () => {
    const file = new File({
      repositoryId: 'repo',
      scanId: 'scan',
      path: '/test.ts',
      size: 100,
    })

    expect(file.id).toBeDefined()
    expect(file.path).toBe('/test.ts')
    expect(file.isArchived).toBe(false)
  })

  it('should rename file', () => {
    const file = new File({
      repositoryId: 'repo',
      scanId: 'scan',
      path: '/test.ts',
      size: 100,
    })

    file.rename('/new.ts')

    expect(file.path).toBe('/new.ts')
  })

  it('should archive file', () => {
    const file = new File({
      repositoryId: 'repo',
      scanId: 'scan',
      path: '/test.ts',
      size: 100,
    })

    file.archive()

    expect(file.isArchived).toBe(true)
  })

  it('should delete file', () => {
    const file = new File({
      repositoryId: 'repo',
      scanId: 'scan',
      path: '/test.ts',
      size: 100,
    })

    file.delete()

    expect(file.deletedAt).not.toBeNull()
  })
})
