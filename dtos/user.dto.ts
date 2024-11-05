import { Types } from 'mongoose'
import { IUserModel } from '../types/user.types'

export default class UserDto {
  id: string
  username: string
  email: string
  phone: string
  image: string
  activated: boolean
  isAdmin: boolean
  createdAt: Date
  constructor(model: IUserModel) {
    this.id = model._id as string
    this.username = model.username
    this.email = model.email
    this.phone = model.phone
    this.image = model.image
    this.activated = model.activated
    this.isAdmin = model.isAdmin
    this.createdAt = model.createdAt
  }
}
