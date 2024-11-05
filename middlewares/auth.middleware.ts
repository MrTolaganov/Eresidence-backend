import { NextFunction, Request, Response } from 'express'
import BaseError from '../errors/base.error'
import tokenService from '../services/token.service'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHead = req.headers.authorization
    if (!authHead) {
      return next(BaseError.UnauthorizedError())
    }
    const accessToken = authHead?.split(' ').at(1)
    const userPayload = tokenService.validateAccessToken(accessToken!)

    if (!userPayload) {
      return next(BaseError.UnauthorizedError())
    }
    //   @ts-ignore
    req.user = userPayload
    next()
  } catch (error) {
    return next(BaseError.BadRequest(`Error with auth middleware: ${error}`))
  }
}
