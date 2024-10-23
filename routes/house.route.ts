import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import houseController from '../controllers/house.controller'
import authorMiddleware from '../middlewares/author.middleware'

const houseRouter = Router()

houseRouter.post('/create', authMiddleware, houseController.addHouse)
houseRouter.get('/gethouse/:houseId', houseController.getHouse)
houseRouter.get('/gethouses', houseController.getHouses)
houseRouter.put('/update/:houseId', authMiddleware, authorMiddleware, houseController.editHouse)
houseRouter.delete(
  '/delete/:houseId',
  authMiddleware,
  authorMiddleware,
  houseController.deleteHouse
)

export default houseRouter
