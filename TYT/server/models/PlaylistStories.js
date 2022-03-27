import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const PlaylistStorySchema = new Schema({
  storyId: { type: Schema.Types.ObjectId, ref: 'Story' },
  playlistId: { type: Schema.Types.ObjectId, ref: 'Playlist', required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)

PlaylistStorySchema.virtual('story', {
  localField: 'storyId',
  foreignField: '_id',
  justOne: true,
  ref: 'Story'
})
PlaylistStorySchema.virtual('playlist', {
  localField: 'playlistId',
  foreignField: '_id',
  justOne: true,
  ref: 'Playlist'
})
