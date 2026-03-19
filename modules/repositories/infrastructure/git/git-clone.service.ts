import simpleGit from 'simple-git'
import path from 'path'
import fs from 'fs/promises'

export class GitCloneService {
  private readonly workspaceRoot = path.resolve(process.cwd(), 'workspace')

  async cloneRepository(url: string, repositoryId: string) {
    const workspace = path.resolve(this.workspaceRoot, repositoryId)

    await this.prepareWorkspace(repositoryId)

    const git = simpleGit(this.workspaceRoot)

    await git.clone(url, repositoryId, ['--depth', '1'])

    return workspace
  }

  async listTrackedFiles(repositoryPath: string): Promise<string[]> {
    const git = simpleGit(repositoryPath)

    const result = await git.raw(['ls-files'])

    return result
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean)
      .map((f) => path.join(repositoryPath, f))
  }

  private async prepareWorkspace(repositoryId: string) {
    const workspace = path.resolve(this.workspaceRoot, repositoryId)

    await fs.rm(workspace, { recursive: true, force: true })
    await fs.mkdir(this.workspaceRoot, { recursive: true })
  }
}
