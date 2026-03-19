import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ArchiveFileUseCase } from '@/modules/file/application/archive-file.usecase'
import { PrismaFileRepository } from '@/modules/file/infrastructure/PrismaFileRepository'

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const usecase = new ArchiveFileUseCase(new PrismaFileRepository())

  const file = await usecase.execute({
    fileId: params.id,
  })

  return NextResponse.json(file)
}
