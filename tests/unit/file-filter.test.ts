import { describe, it, expect } from 'vitest'
import { shouldIgnore } from '@/modules/repositories/infrastructure/workspace/file-filter'

describe('File filter', () => {
  it('should ignore node_modules', () => {
    expect(shouldIgnore('/repo/node_modules/react/index.js')).toBe(true)
  })

  it('should allow source files', () => {
    expect(shouldIgnore('/repo/src/index.ts')).toBe(false)
  })
})
