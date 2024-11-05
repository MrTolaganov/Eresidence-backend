export default class BaseError extends Error {
  status: number
  errors: object | undefined
  constructor(status: number, message: string, errors?: object) {
    super(message)
    this.status = status
    this.errors = errors
  }
  static BadRequest(message: string, errors = []) {
    throw new BaseError(400, message, errors)
  }
  static UnauthorizedError() {
    throw new BaseError(401, 'User is unauthorized')
  }
}
