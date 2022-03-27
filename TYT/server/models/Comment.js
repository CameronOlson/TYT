import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    storyId: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
CommentSchema.virtual('story', {
  localField: 'storyId',
  foreignField: '_id',
  justOne: true,
  ref: 'Story'
})
