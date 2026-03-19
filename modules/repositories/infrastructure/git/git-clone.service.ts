import simpleGit from 'simple-git'
import path from 'path'
import fs from 'fs/promises'

export class GitCloneService {
  async cloneRepository(url: string, repositoryId: string) {
    const workspaceRoot = path.resolve(process.cwd(), 'workspace')
    const workspace = path.resolve(workspaceRoot, repositoryId)

    await fs.rm(workspace, { recursive: true, force: true })
    await fs.mkdir(workspaceRoot, { recursive: true })

    const git = simpleGit()

    await git.clone(url, workspace, ['--depth', '1'])

    return workspace
  }
}
