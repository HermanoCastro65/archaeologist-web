import { execSync } from 'child_process'

if (!process.env.__DB_INITIALIZED__) {
  process.env.__DB_INITIALIZED__ = 'true'

  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5433/archaeologist_test'

  execSync('npx prisma migrate deploy', {
    stdio: 'ignore',
  })
}
