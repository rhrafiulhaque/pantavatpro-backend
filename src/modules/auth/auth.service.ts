import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'
import ApiError from '../../error/ApiError'
import { IUser } from '../users/user.interface'
import { User } from '../users/user.model'
import config from '../../app/config'
import { IUserLoginResponse } from './auth.interface'
const logIn = async (user: IUser): Promise<IUserLoginResponse> => {
  const { email, contactNo, password } = user
  const userExist = await User.findOne(
    {
      $or: [{ email }, { contactNo }],
    },
    { password: 1, role: 1, email: 1 },
  ).lean()
  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Doesnot Exist!')
  }

  const isPasswordMatched = await bcrypt.compare(password, userExist.password)
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Doesnot Match!')
  }

  const accessToken = jwt.sign(
    {
      email: userExist.email,
      role: userExist?.role,
    },
    config.jwt.jwt_secret as Secret,
    {
      expiresIn: config.jwt.jwt_expire_in,
    },
  )
  const refreshToken = jwt.sign(
    {
      email: userExist.email,
      role: userExist?.role,
    },
    config.jwt.jwt_refresh_token as Secret,
    {
      expiresIn: config.jwt.jwt_refresh_expire_in,
    },
  )

  return {
    accessToken,
    refreshToken,
  }
}

export const authService = {
  logIn,
}
