import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
p.outfitRecommendation.findMany().then(res => {
    res.forEach(r => console.log(`${r.state} - Min: ${r.minTemp}, Max: ${r.maxTemp}`))
}).catch(console.error)
