import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5433/archaeologist_test'

execSync('npx prisma migrate deploy', { stdio: 'inherit' })

export async function cleanWorkspace() {
  const workspace = path.join(process.cwd(), 'workspace')

  await fs.rm(workspace, {
    recursive: true,
    force: true,
  })
}
