import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class PlaylistsService {
  async removePlaylist(playlistId, userId) {
    const playlist = await this.getPlaylistById(playlistId)
    if (userId !== playlist.creatorId.toString()) {
      throw new Forbidden("This isn't yours")
    }
    await playlist.delete()
    await dbContext.PlaylistStories.deleteMany({ playlistId: playlistId })
  }

  async removePlaylistStory(playlistId, playlistStoryId, userId) {
    const playlist = await this.getPlaylistById(playlistId)
    if (userId !== playlist.creatorId.toString()) {
      throw new Forbidden("This isn't yours")
    }
    await dbContext.PlaylistStories.findByIdAndRemove(playlistStoryId)
  }

  async editPlaylist(body) {
    const playlist = await this.getPlaylistById(body.id)
    if (body.creatorId !== playlist.creatorId.toString()) {
      throw new Forbidden("This isn't yours")
    }
    playlist.name = body.name || playlist.name
    playlist.desc = body.desc || playlist.desc
    await playlist.save()
    return playlist
  }

  async createPlaylistStory(body, id) {
    const playlist = await this.getPlaylistById(body.playlistId)
    if (id !== playlist.creatorId.toString()) {
      throw new Forbidden("This isn't yours")
    }
    const playlistStory = await dbContext.PlaylistStories.create(body)
    await playlistStory.populate('story')
    await playlistStory.populate('playlist')
    return playlistStory
  }

  async createPlaylist(body) {
    const playlist = await dbContext.Playlists.create(body)
    return playlist
  }

  async getStoriesByPlaylistId(id) {
    const playlistStories = await dbContext.PlaylistStories.find({ playlistId: id }).populate('story')
    return playlistStories
  }

  async getPlaylistById(id) {
    const playlist = await dbContext.Playlists.findById(id).populate('creator', 'name picture')
    if (!playlist) {
      throw new BadRequest("Can't find that")
    }
    return playlist
  }

  async getPlaylists(query) {
    const playlists = await dbContext.Playlists.find(query)
    return playlists
  }
}
export const playlistsService = new PlaylistsService()
