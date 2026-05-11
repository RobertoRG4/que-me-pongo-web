import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
p.outfitRecommendation.findMany().then(res => {
    console.log(JSON.stringify(res, null, 2))
}).catch(console.error)
