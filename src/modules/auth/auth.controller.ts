import { RequestHandler } from 'express'
import config from '../../app/config'
import { authService } from './auth.service'

const logIn: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.logIn(req.body)

    const { refreshToken, ...others } = result

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'User Logged In successfully!',
      data: others,
    })
  } catch (err) {
    next(err)
  }
}

const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies

    const result = await authService.refreshToken(refreshToken)

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'Refresh Token generate successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const authController = {
  logIn,
  refreshToken,
}
