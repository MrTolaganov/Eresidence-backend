import { NextFunction, Request, Response } from 'express'
import BaseError from '../errors/base.error'
import houseService from '../services/house.service'

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { house } = await houseService.getHouse(req.params.houseId)
    // @ts-ignore
    if (req.user.id !== house.user._id.toString())
      return next(BaseError.BadRequest('Only author can edit or delete this house'))
    next()
  } catch (error) {
    return next(BaseError.BadRequest(`Error with author middleware: ${error}`))
  }
}
