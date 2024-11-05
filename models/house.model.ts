import { model, Schema } from 'mongoose'
import { IHouse } from '../types/house.type'

const houseSchema = new Schema<IHouse>(
  {
    label: { type: String, required: true },
    image: { type: String, required: true },
    body: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default model('House', houseSchema)
