import { NextFunction, Request, Response } from 'express'
import feedbackService from '../services/feedback.service'

class FeedbackController {
  async onFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const feedback = await feedbackService.onFeedback(req.user.id, req.params.houseId, req.body)
      res.status(200).json(feedback)
    } catch (error) {
      next(error)
    }
  }
  async getHouseFeedbacks(req: Request, res: Response, next: NextFunction) {
    try {
      const houseFeedbacks = await feedbackService.getHouseFeedbacks(req.params.houseId)
      res.status(200).json(houseFeedbacks)
    } catch (error) {
      next(error)
    }
  }
  async getAllFeedbacks(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const allFeedbacks = await feedbackService.getAllFeedbacks()
      res.status(200).json(allFeedbacks)
    } catch (error) {
      next(error)
    }
  }
  async deleteFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedFeedback = await feedbackService.deleteFeedback(req.params.feedbackId)
      res.status(200).json(deletedFeedback)
    } catch (error) {
      next(error)
    }
  }
}

export default new FeedbackController()
