import { NextFunction, Request, Response } from 'express'
import BaseError from '../errors/base.error'

export default function (err: object, req: Request, res: Response, next: NextFunction) {
  if (err instanceof BaseError) {
    res.status(err.status).json({ message: err.message })
  } else {
    res.status(500).json({ message: `Server error: ${err}` })
  }
}
