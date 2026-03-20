import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'

export async function PATCH(
  _: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await getServerSession()

    const params = await context.params
    const id = params.id

    try {
      const updated = await prisma.repositoryFile.update({
        where: { id },
        data: {
          isArchived: true,
        },
      })

      return NextResponse.json(updated)
    } catch {
      const updated = await prisma.repository.update({
        where: { id },
        data: {
          isArchived: true,
        },
      })

      return NextResponse.json(updated)
    }
  } catch (error) {
    console.error('ARCHIVE ERROR:', error)
    return NextResponse.json({ error: 'Archive failed' }, { status: 500 })
  }
}
