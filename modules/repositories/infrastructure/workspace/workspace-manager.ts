import fs from 'fs/promises'
import path from 'path'
import { shouldIgnore } from './file-filter'

export class WorkspaceManager {
  async listFiles(directory: string): Promise<string[]> {
    const files: string[] = []

    async function walk(dir: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (shouldIgnore(fullPath)) continue

        if (entry.isDirectory()) {
          await walk(fullPath)
        } else {
          files.push(fullPath)
        }
      }
    }

    await walk(directory)

    return files
  }
}
