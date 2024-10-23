import { connect } from 'mongoose'

export default async function connectDatabase() {
  try {
    await connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected successfully')
  } catch (error) {
    throw new Error(`Error connecting MongoDB: ${error}`)
  }
}
