import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'

function isValidGitRepository(url: string) {
  return /^https:\/\/github\.com\/[^\/]+\/[^\/]+/.test(url)
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url } = await req.json()

    if (!isValidGitRepository(url)) {
      return NextResponse.json({ error: 'Invalid GitHub repository URL' }, { status: 400 })
    }

    const createRepo = new CreateRepositoryUseCase()

    const repository = await createRepo.execute({
      url,
      userId: session.user.id,
    })

    const scanner = new ScanRepositoryUseCase()

    const result = await scanner.execute(repository.id)

    return NextResponse.json({
      repositoryId: repository.id,
      files: result.filesIndexed,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Repository not found or cannot be cloned',
      },
      { status: 400 }
    )
  }
}
