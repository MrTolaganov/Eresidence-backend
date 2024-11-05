import UserDto from '../dtos/user.dto'
import BaseError from '../errors/base.error'
import userModel from '../models/user.model'
import { IUser, IUserModel } from '../types/user.types'
import feedbackService from './feedback.service'
import houseService from './house.service'
import mailService from './mail.service'
import tokenService from './token.service'
import { compare, hash } from 'bcrypt'

class AuthService {
  async signup(user: IUser) {
    const { username, email, phone, pass } = user
    const existedUsername = await userModel.findOne({ username })
    if (existedUsername) throw BaseError.BadRequest('User has already signed up with this username')
    const existedEmail = await userModel.findOne({ email })
    if (existedEmail) throw BaseError.BadRequest('User has already signed up with this email')
    const existedPhone = await userModel.findOne({ phone })
    if (existedPhone) throw BaseError.BadRequest('User has already signed up with this phone')
    const hashedPass = await hash(pass, 10)
    const newUser = await userModel.create({ username, email, phone, pass: hashedPass })
    const userDto = new UserDto(newUser)
    await mailService.sendActivationLink(
      userDto.email,
      `${process.env.API_URL}/api/auth/activate/${userDto.id}`
    )
    const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, refreshToken)
    return { user: userDto, accessToken, refreshToken }
  }
  async activate(userId: string) {
    const user = await userModel.findById(userId)
    if (!user) throw BaseError.BadRequest('User has not signed up yet')
    await userModel.findByIdAndUpdate(userId, { activated: true })
  }
  async signin(user: IUser) {
    const { email, pass } = user
    const existedUser = await userModel.findOne({ email })
    if (!existedUser) throw BaseError.BadRequest('User has not signed up yet with this email')
    const correctPass = await compare(pass, existedUser.pass)
    if (!correctPass) throw BaseError.BadRequest('Imcorrect password')
    const userDto = new UserDto(existedUser)
    const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, refreshToken)
    return { user: userDto, accessToken, refreshToken }
  }
  async signout(refreshToken: string) {
    await tokenService.removeToken(refreshToken)
  }
  async refresh(token: string) {
    const userPayload = tokenService.validateRefeshToken(token)
    const foundedRefreshToken = await tokenService.findRefreshToken(token)
    if (!userPayload || !foundedRefreshToken) throw BaseError.UnauthorizedError()
    const user = (await userModel.findById(userPayload.id)) as IUserModel
    const userDto = new UserDto(user)
    const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, refreshToken)
    return { user: userDto, accessToken, refreshToken }
  }
  async forgotPass(email: string) {
    const existedUser = await userModel.findOne({ email })
    if (!existedUser) throw BaseError.BadRequest('User has not signed up yet with this email')
    const userDto = new UserDto(existedUser)
    const { accessToken } = tokenService.generateTokens({ ...userDto })
    await mailService.sendRecoveryLink(email, `${process.env.CLIENT_URL}/rec-acc/${accessToken}`)
  }
  async recAcc(accessToken: string, pass: string) {
    const userPayload = tokenService.validateAccessToken(accessToken)
    if (!userPayload) throw BaseError.UnauthorizedError()
    const hashedPass = await hash(pass, 10)
    await userModel.findByIdAndUpdate(userPayload.id, { pass: hashedPass })
  }
  async getUser(userId: string) {
    const user = (await userModel.findById(userId)) as IUserModel
    const userDto = new UserDto(user)
    return { user: userDto }
  }
  async getUsers() {
    const users = await userModel.find()
    const userDtos = users.map(user => new UserDto(user))
    return { users: userDtos }
  }
  async editUser(userId: string, userData: IUser) {
    const existedUsernames = await userModel.find({ username: userData.username })
    const existedAnotherUsernames = existedUsernames.filter(user => user._id.toString() !== userId)
    if (existedAnotherUsernames.length > 0)
      throw BaseError.BadRequest('Username has already been taken')
    const user = await userModel.findByIdAndUpdate(userId, userData, { new: true })
    const userDto = new UserDto(user)
    return { user: userDto }
  }
  async deleteUser(userId: string) {
    await houseService.removeAdminHouse(userId)
    await feedbackService.removeAdminFeedback(userId)
    const user = await userModel.findByIdAndDelete(userId)
    const userDto = new UserDto(user as IUserModel)
    return { user: userDto }
  }
}

export default new AuthService()
