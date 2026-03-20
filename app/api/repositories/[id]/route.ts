import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'

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

  try {
    const body = await req.json()

    if (!body?.url) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const createRepository = new CreateRepositoryUseCase()

    const repository = await createRepository.execute({
      url: body.url,
      userId: session.user.id,
    })

    const scanner = new ScanRepositoryUseCase()

    const result = await scanner.execute(repository.id)

    if (result.filesIndexed === 0) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 400 })
    }

    await prisma.repository.create({
      data: {
        id: repository.id,
        url: repository.url.value,
        owner: repository.owner,
        name: repository.name,
        provider: repository.provider,
        userId: repository.userId,
      },
    })

    return NextResponse.json({
      repositoryId: repository.id,
      repositoryName: repository.fullName,
      files: result.filesIndexed,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message ?? 'Unexpected error',
      },
      { status: 400 }
    )
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await prisma.repositoryFile.deleteMany({
      where: { repositoryId: id },
    })

    await prisma.repositoryScan.deleteMany({
      where: { repositoryId: id },
    })

    await prisma.repository.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE ERROR FULL:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
