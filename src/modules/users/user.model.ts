import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../app/config'
import { IUser, UserModel } from './user.interface'
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    district: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    contactNo: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password
        return ret
      },
    },
  },
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrpt_salt_rounds),
  )

  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
