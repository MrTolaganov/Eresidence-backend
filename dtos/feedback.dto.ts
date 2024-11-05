import { Types } from 'mongoose'
import { IFeedbackModel } from '../types/feedback.type'

export default class FeedbackDto {
  id: string
  value: number
  comment: string
  updatedAt: Date
  user: Types.ObjectId
  house: Types.ObjectId
  constructor(model: IFeedbackModel) {
    this.id = model._id as string
    this.value = model.value
    this.comment = model.comment
    this.updatedAt = model.updatedAt
    this.user = model.user
    this.house = model.house
  }
}
