import { NextFunction, Request, Response } from 'express'
import houseService from '../services/house.service'

class HouseController {
  async addHouse(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const house = await houseService.addHouse(req.body, req.user)
      res.status(201).json(house)
    } catch (error) {
      next(error)
    }
  }
  async getHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.getHouse(req.params.houseId)
      res.status(200).json(house)
    } catch (error) {
      next(error)
    }
  }
  async getHouses(req: Request, res: Response, next: NextFunction) {
    try {
      const houses = await houseService.getHouses()
      res.status(200).json(houses)
    } catch (error) {
      next(error)
    }
  }
  async editHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.editHouse(req.params.houseId, req.body)
      res.status(200).json(house)
    } catch (error) {
      next(error)
    }
  }
  async deleteHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.deleteHouse(req.params.houseId)
      res.status(200).json(house)
    } catch (error) {
      next(error)
    }
  }
  async removeHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.removeHouse(req.params.houseId)
      res.status(200).json(house)
    } catch (error) {
      next(error)
    }
  }
}

export default new HouseController()
