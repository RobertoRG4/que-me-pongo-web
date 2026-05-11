import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const recommendations = await prisma.outfitRecommendation.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    // Parse the JSON images string back to an array
    const parsedRecommendations = recommendations.map(rec => ({
      ...rec,
      images: JSON.parse(rec.images)
    }))

    return NextResponse.json(parsedRecommendations, { status: 200 })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { state, minTemp, maxTemp, recommendation, images } = body

    if (!state || typeof minTemp !== 'number' || typeof maxTemp !== 'number' || !recommendation) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const newRec = await prisma.outfitRecommendation.create({
      data: {
        state,
        minTemp,
        maxTemp,
        recommendation,
        images: JSON.stringify(images || [])
      }
    })

    return NextResponse.json({
      ...newRec,
      images: JSON.parse(newRec.images)
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating recommendation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
