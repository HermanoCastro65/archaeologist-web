import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()

    if (!body?.name) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }

    const updated = await prisma.repository.update({
      where: { id },
      data: {
        name: body.name,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('RENAME ERROR:', error)
    return NextResponse.json({ error: 'Rename failed' }, { status: 500 })
  }
}
