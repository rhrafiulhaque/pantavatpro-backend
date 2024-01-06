import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../app/config'
import ApiError from '../../error/ApiError'
import { usersService } from './user.service'
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await usersService.createUser(req.body)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getAllUsers: RequestHandler = async (req, res, next) => {
  console.log(req.user)
  try {
    const result = await usersService.getAllUsers()
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getUserByEmail: RequestHandler = async (req, res, next) => {
  const { userEmail } = req.params
  try {
    const token = req.cookies.refreshToken
    let verifiedUser: JwtPayload | null = null

    verifiedUser = jwt.verify(
      token,
      config.jwt.jwt_refresh_token as Secret,
    ) as JwtPayload
    if (verifiedUser.email !== req.params.userEmail) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are UNAUTHORIZED')
    }
    const result = await usersService.getUserByEmail(userEmail)
    res.status(200).json({
      success: true,
      message: 'User retrive successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken
    let verifiedUser: JwtPayload | null = null

    verifiedUser = jwt.verify(
      token,
      config.jwt.jwt_refresh_token as Secret,
    ) as JwtPayload
    if (verifiedUser.email !== req.body.email) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are UNAUTHORIZED')
    }
    const result = await usersService.updateUser(req.body)
    res.status(200).json({
      success: true,
      message: 'User Updated successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
}
