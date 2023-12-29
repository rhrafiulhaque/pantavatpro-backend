import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import ApiError from '../../error/ApiError'
import { IUser } from '../users/user.interface'
import { User } from '../users/user.model'
const logIn = async (user: IUser): Promise<IUser | null> => {
  const { email, contactNo, password } = user
  const userExist = await User.findOne(
    {
      $or: [{ email }, { contactNo }],
    },
    { password: 1, role: 1 ,email:1 },
  ).lean()
  console.log(userExist)
  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Doesnot Exist!')
  }

  const isPasswordMatched = await bcrypt.compare(password, userExist.password)
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Doesnot Match!')
  }
 
  const accessToken = jwt.sign({
    email:
    role: userExist?.role
  })


  console.log(isPasswordMatched)
  return user
}

export const authService = {
  logIn,
}
