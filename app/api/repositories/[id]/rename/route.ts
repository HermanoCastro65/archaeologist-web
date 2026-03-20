import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession()

    const params = await context.params
    const id = params.id
    const body = await req.json()

    let updated

    try {
      updated = await prisma.repositoryFile.update({
        where: { id },
        data: {
          path: body.path ?? body.name,
        },
      })
    } catch {
      updated = await prisma.repository.update({
        where: { id },
        data: {
          name: body.name ?? body.path,
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
    console.error('RENAME ERROR:', error)
    return NextResponse.json({ error: 'Rename failed' }, { status: 500 })
  }
}
