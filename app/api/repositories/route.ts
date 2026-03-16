import { NextResponse } from 'next/server'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: Request) {
  const { url } = await req.json()

  const createRepo = new CreateRepositoryUseCase()

  const repository = await createRepo.execute({
    url,
  })

  const scanner = new ScanRepositoryUseCase()

  await scanner.execute(repository.id)

  const files = await prisma.repositoryFile.count({
    where: {
      repositoryId: repository.id,
    },
  })

  return NextResponse.json({
    repositoryId: repository.id,
    files,
  })
}
