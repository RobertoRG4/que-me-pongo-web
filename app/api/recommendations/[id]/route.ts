import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id
    const body = await request.json()
    const { state, minTemp, maxTemp, recommendation, images } = body

    if (!state || typeof minTemp !== 'number' || typeof maxTemp !== 'number' || !recommendation) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const updatedRec = await prisma.outfitRecommendation.update({
      where: { id },
      data: {
        state,
        minTemp,
        maxTemp,
        recommendation,
        images: JSON.stringify(images || [])
      }
    })

    return NextResponse.json({
      ...updatedRec,
      images: JSON.parse(updatedRec.images)
    }, { status: 200 })
  } catch (error) {
    console.error('Error updating recommendation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id
    await prisma.outfitRecommendation.delete({
      where: { id }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting recommendation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
