import HouseDto from '../dtos/house.dto'
import houseModel from '../models/house.model'
import userModel from '../models/user.model'
import { IHouse, IHouseModel } from '../types/house.type'
import { IUserModel } from '../types/user.types'

class HouseService {
  async addHouse(house: IHouse, author: IUserModel) {
    const newHouse = await houseModel.create({ ...house, user: author.id })
    const houseDto = new HouseDto(newHouse)
    return { house: houseDto }
  }
  async getHouse(houseId: string) {
    const house = await houseModel
      .findById(houseId)
      .populate({ path: 'user', model: userModel, select: 'username email phone image' })
    const houseDto = new HouseDto(house as IHouseModel)
    return { house: houseDto }
  }
  async getHouses() {
    const houses = await houseModel
      .find()
      .populate({ path: 'user', model: userModel, select: 'username email phone image' })
    const houseDtos = houses.map(house => new HouseDto(house))
    return { houses: houseDtos }
  }
  async editHouse(houseId: string, house: IHouse) {
    const updatedHouse = await houseModel.findByIdAndUpdate(houseId, house, { new: true })
    const houseDto = new HouseDto(updatedHouse as IHouseModel)
    return { house: houseDto }
  }
  async deleteHouse(houseId: string) {
    const house = await houseModel.findByIdAndDelete(houseId)
    const houseDto = new HouseDto(house as IHouseModel)
    return { house: houseDto }
  }
  async removeHouse(houseId: string) {
    const house = await houseModel.findByIdAndDelete(houseId)
    const houseDto = new HouseDto(house as IHouseModel)
    return { house: houseDto }
  }
  async removeAdminHouse(userId: string) {
    await houseModel.deleteMany({ user: userId })
  }
}

export default new HouseService()
