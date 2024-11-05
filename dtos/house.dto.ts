import { Types } from 'mongoose'
import { IHouse, IHouseModel } from '../types/house.type'
import { IUser } from '../types/user.types'

export default class HouseDto {
  id: string
  label: string
  image: string
  body: string
  location: string
  price: number
  createdAt: Date
  user: Types.ObjectId
  constructor(model: IHouseModel) {
    this.id = model._id as string
    this.label = model.label
    this.image = model.image
    this.body = model.body
    this.location = model.location
    this.price = model.price
    this.user = model.user
    this.createdAt = model.createdAt
  }
}
