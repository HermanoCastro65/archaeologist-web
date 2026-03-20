import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  await prisma.repositoryFile.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}
