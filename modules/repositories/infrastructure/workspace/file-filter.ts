import path from 'path'

export const IGNORED_FOLDERS = ['.git', 'node_modules', '.next', 'dist', 'build']

export function shouldIgnore(filePath: string) {
  const normalized = filePath.split(/[\\/]+/)
  return normalized.some((part) => IGNORED_FOLDERS.includes(part))
}
