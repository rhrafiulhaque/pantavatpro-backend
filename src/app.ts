import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import routes from './app/routes'
import globalErrorHandler from './error/globalErrorHandler'
const app: Application = express()

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend application
    credentials: true,
  }),
)

app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)
app.use(globalErrorHandler)
export default app
