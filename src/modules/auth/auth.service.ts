import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../app/config'
import ApiError from '../../error/ApiError'
import { IUser } from '../users/user.interface'
import { User } from '../users/user.model'
import { IUserLoginResponse } from './auth.interface'
const logIn = async (user: IUser): Promise<IUserLoginResponse> => {
  const { email, password } = user
  const userExist = await User.findOne(
    { email },
    { password: 1, role: 1, email: 1, name: 1 },
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
      name: userExist?.name,
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

const refreshToken = async (token: string) => {
  let verifiedToken = null
  try {
    verifiedToken = jwt.verify(token, config.jwt.jwt_refresh_token as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken as jwt.JwtPayload
  const userExist = await User.findOne(
    { email },
    { password: 1, role: 1, email: 1 },
  ).lean()
  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Doesnot Exist!')
  }

  const newAccessToken = jwt.sign(
    {
      email: userExist.email,
      role: userExist?.role,
    },
    config.jwt.jwt_secret as Secret,
    {
      expiresIn: config.jwt.jwt_expire_in,
    },
  )

  return {
    accessToken: newAccessToken,
  }
}

export const authService = {
  logIn,
  refreshToken,
}
