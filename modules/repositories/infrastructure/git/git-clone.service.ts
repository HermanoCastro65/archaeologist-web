import simpleGit from 'simple-git'
import path from 'path'
import fs from 'fs/promises'

export class GitCloneService {
  async cloneRepository(url: string, repositoryId: string) {
    const workspace = path.join(process.cwd(), 'workspace', repositoryId)

    await fs.mkdir(workspace, { recursive: true })

    const git = simpleGit()

    await git.clone(url, workspace)

    return workspace
  }
}
