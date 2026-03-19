import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'

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

    return NextResponse.json({
      repositoryId: repository.id,
      repositoryName: repository.fullName,
      files: result.filesIndexed,
      filesIndexed: result.filesIndexed,
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
