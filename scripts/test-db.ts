import { prisma } from '../lib/db/prisma'

async function main() {
  const record = await prisma.healthCheck.create({
    data: {
      message: 'Database working',
    },
  })

  console.log(record)
}

main()
