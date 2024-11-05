import { Document } from 'mongoose'

export interface IUser {
  username: string
  email: string
  phone: string
  pass: string
  image: string
  activated: boolean
  isAdmin: boolean
  createdAt: Date
}

export interface IUserModel extends IUser, Document {}
