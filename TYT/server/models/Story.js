import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const StorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    storyTags: [{ type: String, required: true }],
    originalMp3: { type: String, required: true },
    storyArt: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

StorySchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
