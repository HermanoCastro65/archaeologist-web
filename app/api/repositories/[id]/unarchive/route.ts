import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function PATCH(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const updated = await prisma.repository.update({
      where: { id },
      data: {
        isArchived: false,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('UNARCHIVE ERROR:', error)
    return NextResponse.json({ error: 'Unarchive failed' }, { status: 500 })
  }
}
