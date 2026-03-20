import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await getServerSession()

    const params = await context.params
    const id = params.id
    const body = await req.json()

    try {
      const updated = await prisma.repositoryFile.update({
        where: { id },
        data: {
          path: body.path ?? body.name,
        },
      })

      return NextResponse.json(updated)
    } catch {
      const updated = await prisma.repository.update({
        where: { id },
        data: {
          name: body.name ?? body.path,
        },
      })

      return NextResponse.json(updated)
    }
  } catch (error) {
    console.error('RENAME ERROR:', error)
    return NextResponse.json({ error: 'Rename failed' }, { status: 500 })
  }
}
