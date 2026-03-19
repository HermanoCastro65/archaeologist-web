import { describe, it, expect } from 'vitest'
import { shouldIgnore } from '@/modules/repositories/infrastructure/workspace/file-filter'

describe('File filter', () => {
  it.each([
    ['/repo/node_modules/react/index.js', true],
    ['/repo/.git/config', true],
    ['/repo/src/index.ts', false],
  ])('should filter %s correctly', (input, expected) => {
    expect(shouldIgnore(input)).toBe(expected)
  })
})
