import { Model, Types } from 'mongoose'

export type IReview = {
  userEmail: string
  userName: string
  rating: number
  reviewText: string
  food: Types.ObjectId
}

export type ReviewModel = Model<IReview>
