import { model, Schema } from 'mongoose'

const tokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
)

export default model('Token', tokenSchema)
