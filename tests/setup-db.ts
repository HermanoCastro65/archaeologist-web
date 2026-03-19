import { beforeEach } from 'vitest'
import { resetDatabase } from './utils/reset-db'

beforeEach(async () => {
  await resetDatabase()
})
