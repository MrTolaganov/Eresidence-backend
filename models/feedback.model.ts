import { model, Schema } from 'mongoose'

const feedbackSchema = new Schema(
  {
    value: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    house: { type: Schema.Types.ObjectId, ref: 'House' },
  },
  { timestamps: true }
)

export default model('Feedback', feedbackSchema)
