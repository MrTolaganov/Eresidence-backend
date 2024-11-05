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
      .populate({ path: 'user', model: userModel, select: 'username image' })
      .populate({ path: 'house', model: houseModel, select: 'label' })
    const feedbackDtos = allFeedbacks.map(feedback => new FeedbackDto(feedback as IFeedbackModel))
    return { feedbacks: feedbackDtos }
  }
  async getHouseFeedbacks(houseId: string) {
    const houseFeedbacks = await feedbackModel
      .find({ house: houseId })
      .select('value comment user')
      .populate({ path: 'user', model: userModel, select: 'username email phone image' })
    const starValues = houseFeedbacks.map(houseFeedback => houseFeedback.value)
    const avgStarsValue = starValues.reduce((acc, cur) => acc + cur, 0) / houseFeedbacks.length
    return { avgStarsValue, feedbacks: houseFeedbacks }
  }
  async deleteFeedback(feedbackId: string) {
    const feedback = await feedbackModel.findByIdAndDelete(feedbackId)
    const feedbackDto = new FeedbackDto(feedback as IFeedbackModel)
    return { feedback: feedbackDto }
  }
  async removeAdminFeedback(userId: string) {
    await feedbackModel.deleteMany({ user: userId })
  }
}

export default new FeedbackService()
