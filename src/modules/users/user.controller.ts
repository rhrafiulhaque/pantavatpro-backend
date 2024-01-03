import { RequestHandler } from 'express'
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

export const UserController = {
  createUser,
  getAllUsers,
  getUserByEmail,
}
