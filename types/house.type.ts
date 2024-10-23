import { Document, Types } from 'mongoose'

export interface IHouse {
  label: string
  image: string
  body: string
  location: string
  price: number
  soldOut: boolean
  user: Types.ObjectId
}

export interface IHouseModel extends IHouse, Document {}
