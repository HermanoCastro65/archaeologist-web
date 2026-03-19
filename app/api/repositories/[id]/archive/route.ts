import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function PATCH(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const updated = await prisma.repository.update({
      where: { id },
      data: {
        isArchived: true,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('ARCHIVE ERROR FULL:', error)
    return NextResponse.json({ error: 'Archive failed' }, { status: 500 })
  }
}
