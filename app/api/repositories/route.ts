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

  const scans = await prisma.repositoryScan.findMany({
    where: {
      repositoryId: { in: repos.map((r) => r.id) },
    },
  })

  const latestScanMap = new Map<string, number>()

  for (const scan of scans) {
    const existing = latestScanMap.get(scan.repositoryId)

    if (!existing || (scan.filesCount ?? 0) > existing) {
      latestScanMap.set(scan.repositoryId, scan.filesCount ?? 0)
    }
  }

  const formatted = repos
    .map((r) => ({
      id: r.id,
      owner: r.owner,
      name: r.name,
      files: latestScanMap.get(r.id) ?? 0,
      isArchived: r.isArchived,
    }))
    .filter((r) => r.files > 0)

  return NextResponse.json(formatted)
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
      await prisma.repository.deleteMany({
        where: { id: repository.id },
      })

      return NextResponse.json({ error: 'Repository not found' }, { status: 400 })
    }

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
