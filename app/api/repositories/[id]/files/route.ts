import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 })
  }

  const files = await prisma.repositoryFile.findMany({
    where: {
      repositoryId: params.id,
      repository: {
        userId: session.user.id,
      },
    },
  })

  return NextResponse.json(files)
}
