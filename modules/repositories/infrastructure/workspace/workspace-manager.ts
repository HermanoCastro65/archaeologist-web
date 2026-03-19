import fs from 'fs/promises'
import path from 'path'
import { shouldIgnore } from './file-filter'

export class WorkspaceManager {
  async listFiles(directory: string): Promise<string[]> {
    const files: string[] = []

    await this.walk(directory, files)

    return files
  }

  private async walk(dir: string, files: string[]) {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (shouldIgnore(fullPath)) continue

      if (entry.isDirectory()) {
        await this.walk(fullPath, files)
      } else {
        files.push(fullPath)
      }
    }
  }
}
