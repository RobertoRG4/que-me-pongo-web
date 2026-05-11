import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeder...')

  // Contraseña encriptada "admin" y "user123" para las pruebas
  const adminPassword = await bcrypt.hash('admin', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  // Crear o actualizar Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: { password: adminPassword, role: 'ADMIN' },
    create: {
      email: 'admin@admin.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log(`✅ Creado usuario ADMIN: ${admin.email} (Contraseña: admin)`)

  // Crear o actualizar User Regular
  const regular = await prisma.user.upsert({
    where: { email: 'usuario@ejemplo.com' },
    update: { password: userPassword, role: 'USER' },
    create: {
      email: 'usuario@ejemplo.com',
      password: userPassword,
      role: 'USER',
    },
  })
  console.log(`✅ Creado usuario REGULAR: ${regular.email} (Contraseña: user123)`)

  console.log('✅ Base de datos poblada exitosamente.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
