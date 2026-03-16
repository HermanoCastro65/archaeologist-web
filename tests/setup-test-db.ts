import { execSync } from 'child_process'

process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5433/archaeologist_test'

execSync('npx prisma migrate deploy', {
  stdio: 'inherit',
})
