import { app } from './app'
import { prisma } from './prisma'

// OBRIGA usar a porta que o Railway mandar, ou 3333 localmente
const PORT = process.env.PORT || 3333

async function startServer() {
  await prisma.$connect()
  app.listen(PORT, () => {
    console.log(`✅ SiNutre Backend rodando na porta ${PORT}`)
  })
}

startServer()