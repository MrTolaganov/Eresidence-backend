import { Document, Types } from 'mongoose'

export interface IHouse {
  label: string
  image: string
  body: string
  location: string
  price: number
  user: Types.ObjectId
  createdAt: Date
}

export interface IHouseModel extends IHouse, Document {}
