import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 })
  }

  const repos = await prisma.repository.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(repos)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { url } = await req.json()

  try {
    const createRepo = new CreateRepositoryUseCase()

    const repository = await createRepo.execute({
      url,
      userId: session.user.id,
    })

    const scanner = new ScanRepositoryUseCase()

    const result = await scanner.execute(repository.id)

    return NextResponse.json({
      repositoryId: repository.id,
      repositoryName: `${repository.owner}/${repository.name}`,
      files: result.filesIndexed,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Repository not found or cannot be cloned' }, { status: 400 })
  }
}
