import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PlaylistSchema } from '../models/Playlist'
import { PlaylistStorySchema } from '../models/PlaylistStory'
import { StorySchema } from '../models/Story'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Stories = mongoose.model('Story', StorySchema);

  Playlists = mongoose.model('Playlist', PlaylistSchema);
  PlaylistStories = mongoose.model('PlaylistStory', PlaylistStorySchema)
}

export const dbContext = new DbContext()
