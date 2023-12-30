import { RequestHandler } from 'express'
import { authService } from './auth.service'

const logIn: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.logIn(req.body)
    res.status(200).json({
      success: true,
      message: 'User Logged In successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const authController = {
  logIn,
}
