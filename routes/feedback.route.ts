import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import feedbackController from '../controllers/feedback.controller'
import adminMiddleware from '../middlewares/admin.middleware'

const feedbackRouter = Router()

feedbackRouter.post('/on-feedback/:houseId', authMiddleware, feedbackController.onFeedback)
feedbackRouter.get('/house-fbs/:houseId', feedbackController.getHouseFeedbacks)
feedbackRouter.get('/all-fbs', authMiddleware, adminMiddleware, feedbackController.getAllFeedbacks)
feedbackRouter.delete(
  '/delete/:feedbackId',
  authMiddleware,
  adminMiddleware,
  feedbackController.deleteFeedback
)

export default feedbackRouter
