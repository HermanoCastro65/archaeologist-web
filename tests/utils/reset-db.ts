import { prisma } from '@/lib/db/prisma'

export async function resetDatabase() {
  const tables = await prisma.$queryRawUnsafe(`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `)

  for (const { tablename } of tables as any[]) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`)
  }
}
