export const IGNORED_FOLDERS = ['.git', 'node_modules', '.next', 'dist', 'build']

export function shouldIgnore(path: string) {
  return IGNORED_FOLDERS.some((folder) => path.includes(folder))
}
