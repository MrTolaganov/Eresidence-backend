import { model, Schema } from 'mongoose'
import { IUser } from '../types/user.types'

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pass: { type: String, required: true },
    image: { type: String, default:'' },
    activated: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default model('User', userSchema)
