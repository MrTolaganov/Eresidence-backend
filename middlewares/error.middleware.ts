import { NextFunction, Request, Response } from 'express'

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (Object.keys(err).includes('status')) res.status(err.status).json({ message: err.message })
  else res.status(500).json({ message: `Server error: ${err}` })
}
