import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { encrypt } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      await prisma.loginRecord.create({
        data: { userId: user.id, ipAddress, success: false }
      })
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    // Success login
    await prisma.loginRecord.create({
      data: { userId: user.id, ipAddress, success: true }
    })

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    const sessionToken = await encrypt({ id: user.id, email: user.email, role: user.role })

    const cookieStore = await cookies()
    cookieStore.set('session', sessionToken, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: { id: user.id, email: user.email, role: user.role }
    }, { status: 200 })
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
