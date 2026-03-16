import { NextRequest, NextResponse } from 'next/server'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const create = new CreateRepositoryUseCase()

  const repo = await create.execute({ url })

  const scanner = new ScanRepositoryUseCase()

  const result = await scanner.execute(repo.id)

  return NextResponse.json({
    repositoryId: repo.id,
    filesIndexed: result.filesIndexed,
  })
}
