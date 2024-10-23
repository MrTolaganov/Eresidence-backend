import { NextFunction, Request, Response } from 'express'
import BaseError from '../errors/base.error'
import authService from '../services/auth.service'

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { user } = await authService.getUser(req.user.id)
    if (!user.isAdmin)
      return next(BaseError.BadRequest('You are not an admin to sending this request'))
    next()
  } catch (error) {
    return next(BaseError.BadRequest(`Error with admin middleware: ${error}`))
  }
}
