import { Router } from 'express'
import authController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'
import adminMiddleware from '../middlewares/admin.middleware'

const authRouter = Router()

authRouter.post('/signup', authController.signup)
authRouter.get('/activate/:userId', authController.activate)
authRouter.post('/signin', authController.signin)
authRouter.delete('/signout', authMiddleware, authController.signout)
authRouter.get('/refresh', authController.refresh)
authRouter.post('/forgot-pass', authController.forgotPass)
authRouter.put('/rec-acc', authController.recAcc)
authRouter.put('/update/:userId', authController.editUser)
authRouter.get('/getuser/:userId', authMiddleware, authController.getUser)
authRouter.get('/getusers', authMiddleware, adminMiddleware, authController.getUsers)
authRouter.delete('/delete/:userId', authMiddleware, adminMiddleware, authController.deleteUser)

export default authRouter
