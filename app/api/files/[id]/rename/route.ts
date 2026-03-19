import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { RenameFileUseCase } from '@/modules/file/application/rename-file.usecase'
import { PrismaFileRepository } from '@/modules/file/infrastructure/PrismaFileRepository'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  const usecase = new RenameFileUseCase(new PrismaFileRepository())

  const file = await usecase.execute({
    fileId: params.id,
    newPath: body.path,
  })

  return NextResponse.json(file)
}
