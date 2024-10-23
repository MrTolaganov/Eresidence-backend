import express from 'express'
import { config } from 'dotenv'
import connectDatabase from './database/mongo.database'
import authRouter from './routes/auth.route'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/error.middleware'
import houseRouter from './routes/house.route'
import feedbackRouter from './routes/feedback.route'
import cors from 'cors'

const app = express()

config()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/house', houseRouter)
app.use('/api/feedback', feedbackRouter)

app.use(errorMiddleware)

app.listen(process.env.PORT, async () => {
  await connectDatabase()
  console.log(`Listening on: http://localhost:${process.env.PORT}`)
})
