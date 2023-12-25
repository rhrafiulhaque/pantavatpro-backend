import ApiError from '../../error/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const userExist = await User.findOne({
    $or: [{ email: user.email }, { contactNo: user.contactNo }],
  })
  if (userExist) {
    throw new ApiError(400, 'The Email or Contact No is already Exist')
  } else {
    const result = await User.create(user)
    return result
  }
}

export const usersService = {
  createUser,
}
