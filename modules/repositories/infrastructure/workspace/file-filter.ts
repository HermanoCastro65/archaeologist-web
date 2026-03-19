export const IGNORED_FOLDERS = ['.git', 'node_modules', '.next', 'dist', 'build']

export function shouldIgnore(filePath: string) {
  return IGNORED_FOLDERS.some((folder) => filePath.split('/').includes(folder))
}
