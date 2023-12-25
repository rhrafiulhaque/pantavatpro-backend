import cors from 'cors'
import express, { Application } from 'express'
import routes from './app/routes'
import globalErrorHandler from './error/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(globalErrorHandler)
app.use('/api/v1/', routes)

export default app
