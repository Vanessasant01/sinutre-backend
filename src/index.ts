import { app } from './app'
import { prisma } from './prisma'

const PORT = process.env.PORT || 3333

async function startServer() {
  await prisma.$connect()
  
  app.listen(PORT, () => {
    console.log(`SiNutre back rodando em http://localhost:${PORT}`)
  })
}

startServer()