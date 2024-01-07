import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken' // Import JwtPayload type
import ApiError from '../../error/ApiError'
import config from '../config'

const updateEmailAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      // verify token
      let verifiedUser: JwtPayload | null = null

      verifiedUser = jwt.verify(
        token,
        config.jwt.jwt_secret as Secret,
      ) as JwtPayload // Type assertion
      if (verifiedUser.email !== req.body.email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are UNAUTHORIZED')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default updateEmailAuth
