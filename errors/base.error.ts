export default class BaseError extends Error {
  status: number
  errors: object | undefined
  constructor(status: number, message: string, errors?: object) {
    super(message)
    this.status = status
    this.errors = errors
  }
  static BadRequest(message: string, errors = []) {
    const badRequestError = new BaseError(400, message, errors)
    return badRequestError
  }
  static UnauthorizedError() {
    const unauthorizedError = new BaseError(401, 'User is unauthorized')
    return unauthorizedError
  }
}
