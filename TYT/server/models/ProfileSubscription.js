import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProfileSubscriptionSchema = new Schema({
  subscriberId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  subscribingId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
ProfileSubscriptionSchema.index({ subscriberId: 1, subscribingId: 1 }, { unique: true })
ProfileSubscriptionSchema.virtual('subscriber', {
  localField: 'subscriberId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
ProfileSubscriptionSchema.virtual('subscribing', {
  localField: 'subscribingId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
