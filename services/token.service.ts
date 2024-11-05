import UserDto from '../dtos/user.dto'
import tokenModel from '../models/token.model'
import { sign, verify } from 'jsonwebtoken'
import { IUser, IUserModel } from '../types/user.types'

class TokenService {
  generateTokens(user: UserDto) {
    const accessToken = sign(user, process.env.JWT_ACCESS_KEY!, { expiresIn: '15m' })
    const refreshToken = sign(user, process.env.JWT_REFRESH_KEY!, { expiresIn: '30d' })
    return { accessToken, refreshToken }
  }
  async saveToken(userId: string, refreshToken: string) {
    const token = await tokenModel.findOne({ userId })
    if (token) {
      await tokenModel.findOneAndUpdate({ userId }, { refreshToken })
    } else {
      await tokenModel.create({ userId, refreshToken })
    }
  }
  async removeToken(refreshToken: string) {
    await tokenModel.findOneAndDelete({ refreshToken })
  }
  async findRefreshToken(refreshToken: string) {
    const token = await tokenModel.findOne({ refreshToken })
    return token
  }
  validateAccessToken(accessToken: string) {
    try {
      const userPayload = verify(accessToken, process.env.JWT_ACCESS_KEY!)
      return userPayload as IUserModel
    } catch (error) {
      return null
    }
  }
  validateRefeshToken(refreshToken: string) {
    try {
      const userPayload = verify(refreshToken, process.env.JWT_REFRESH_KEY!)
      return userPayload as IUserModel
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()
