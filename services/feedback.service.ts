import feedbackModel from '../models/feedback.model'
import { IFeedback, IFeedbackModel } from '../types/feedback.type'
import FeedbackDto from '../dtos/feedback.dto'
import userModel from '../models/user.model'
import houseModel from '../models/house.model'

class FeedbackService {
  async onFeedback(userId: string, houseId: string, feedback: IFeedback) {
    const starred = await feedbackModel.findOne({ user: userId, house: houseId })
    if (starred) {
      const editedFeedback = await feedbackModel.findByIdAndUpdate(
        starred._id,
        { ...feedback, user: userId, house: houseId },
        { new: true }
      )
      const feedbackDto = new FeedbackDto(editedFeedback as IFeedbackModel)
      return { feedback: feedbackDto }
    } else {
      const newFeedback = await feedbackModel.create({ ...feedback, user: userId, house: houseId })
      const feedbackDto = new FeedbackDto(newFeedback as IFeedbackModel)
      return { feedback: feedbackDto }
    }
  }
  async getAllFeedbacks() {
    const allFeedbacks = await feedbackModel
      .find()
      .populate({ path: 'user', model: userModel, select: 'username' })
      .populate({ path: 'house', model: houseModel, select: 'label' })
    const feedbackDtos = allFeedbacks.map(feedback => new FeedbackDto(feedback as IFeedbackModel))
    return { allFeedbacks: feedbackDtos }
  }
  async getHouseFeedbacks(houseId: string) {
    const houseFeedbacks = await feedbackModel.find({ house: houseId })
    const values = houseFeedbacks.map(houseFeedback => houseFeedback.value).filter(value => value)
    const numStars = houseFeedbacks
      .map(houseFeedback => houseFeedback.value)
      .filter(star => star).length
    const avgValue = values.reduce((acc, cur) => acc + cur, 0) / numStars
    const comments = houseFeedbacks
      .map(houseFeedback => houseFeedback.comment)
      .filter(comment => comment.trim())
    return { numStars, numComments: comments.length, avgValue, starVals: values, comments }
  }
  async deleteFeedback(feedbackId: string) {
    const feedback = await feedbackModel.findByIdAndDelete(feedbackId)
    const feedbackDto = new FeedbackDto(feedback as IFeedbackModel)
    return { feedback: feedbackDto }
  }
}

export default new FeedbackService()
