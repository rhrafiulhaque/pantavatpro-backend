import { Model } from 'mongoose'

export type IUser = {
  name: string
  role: string
  password: string
  isActive: boolean
  email: string
  address: string
  district: string
  city: string
  profilePicture: string
  contactNo: number
}

export type UserModel = Model<IUser>
