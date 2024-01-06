import { Schema, model } from 'mongoose'
import { IReview, ReviewModel } from './review.interface'
const reviewSchema = new Schema<IReview>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },

    food: {
      type: Schema.Types.ObjectId,
      ref: 'Foods',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Review = model<IReview, ReviewModel>('Reviews', reviewSchema)
