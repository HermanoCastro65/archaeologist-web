import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { DeleteFileUseCase } from '@/modules/file/application/delete-file.usecase'
import { PrismaFileRepository } from '@/modules/file/infrastructure/PrismaFileRepository'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const usecase = new DeleteFileUseCase(new PrismaFileRepository())

  await usecase.execute({
    fileId: params.id,
  })

  return NextResponse.json({ success: true })
}
