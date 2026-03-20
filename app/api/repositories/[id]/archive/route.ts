import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'

export async function PATCH(
  _: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession()

    const params = await context.params
    const id = params.id

    let updated

    try {
      updated = await prisma.repositoryFile.update({
        where: { id },
        data: {
          isArchived: true,
        },
      })
    } catch {
      updated = await prisma.repository.update({
        where: { id },
        data: {
          isArchived: true,
        },
      })
    }

    if (session?.user?.id) {
      try {
        await prisma.repository.updateMany({
          where: {
            id: updated.repositoryId ?? id,
            userId: session.user.id,
          },
          data: {},
        })
      } catch {}
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('ARCHIVE ERROR:', error)
    return NextResponse.json({ error: 'Archive failed' }, { status: 500 })
  }
}
