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

export const UserController = {
  createUser,
}
