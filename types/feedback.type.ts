import { Document, Types } from 'mongoose'

export interface IFeedback {
  value: number
  comment: string
  user: Types.ObjectId
  house: Types.ObjectId
}

export interface IFeedbackModel extends IFeedback, Document {}
