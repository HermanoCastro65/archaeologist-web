import fs from 'fs/promises'

export async function cleanWorkspace(path: string) {
  await fs.rm(path, { recursive: true, force: true })
}
