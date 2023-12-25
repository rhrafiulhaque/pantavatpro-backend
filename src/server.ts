import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

process.on('uncaughtException', () => {
  console.log('Uncaught Exception is Detected')
  process.exit(1)
})
let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Connected')
    server = app.listen(config.port, () => {
      console.log(`Server is Running at ${config.port}`)
    })
  } catch (err) {
    console.log('Error Occuered', err)
  }

  process.on('unhandledRejection', error => {
    console.log('Server is Closing...............')
    if (server) {
      server.close(() => {
        console.log(error) // errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.log('Sigterm is received') //logger.info('Sigterm is received')
  if (server) {
    server.close()
  }
})
