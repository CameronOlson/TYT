import { Auth0Provider } from '@bcwdev/auth0provider'
import { playlistsService } from '../services/PlaylistsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class PlaylistsController extends BaseController {
  constructor() {
    super('api/playlists')
    this.router
      .get('', this.getPlaylists)
      .get('/:id', this.getPlaylistById)
      .get('/:id/stories', this.getStoriesByPlaylistId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPlaylist)
      .post('/:id/stories', this.createPlaylistStory)
      .delete('/:id/stories/:playlistStoryId', this.removePlaylistStory)
      .delete('/:id', this.removePlaylist)
      .put('/:id', this.editPlaylist)
  }

  async removePlaylist(req, res, next) {
    try {
      await playlistsService.removePlaylist(req.params.id, req.userInfo.id)
      res.send('This was removed')
    } catch (error) {
      next(error)
    }
  }

  async removePlaylistStory(req, res, next) {
    try {
      await playlistsService.removePlaylistStory(req.params.id, req.params.playlistStoryId, req.userInfo.id)
      res.send('This was Removed')
    } catch (error) {
      next(error)
    }
  }

  async editPlaylist(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const playlist = await playlistsService.editPlaylist(req.body)
      res.send(playlist)
    } catch (error) {
      next(error)
    }
  }

  async createPlaylistStory(req, res, next) {
    try {
      req.body.playlistId = req.params.id
      const playlistStory = await playlistsService.createPlaylistStory(req.body, req.userInfo.id)
      res.send(playlistStory)
    } catch (error) {
      next(error)
    }
  }

  async createPlaylist(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const playlist = await playlistsService.createPlaylist(req.body)
      res.send(playlist)
    } catch (error) {
      next(error)
    }
  }

  async getStoriesByPlaylistId(req, res, next) {
    try {
      const stories = await playlistsService.getStoriesByPlaylistId(req.params.id)
      res.send(stories)
    } catch (error) {
      next(error)
    }
  }

  async getPlaylistById(req, res, next) {
    try {
      const playlist = await playlistsService.getPlaylistById(req.params.id)
      res.send(playlist)
    } catch (error) {
      next(error)
    }
  }

  async getPlaylists(req, res, next) {
    try {
      const regex = new RegExp(req.query.search, 'i')
      const query = { $or: [{ name: { $regex: regex } }, { playlistTags: { $regex: regex } }] }
      logger.log(query)
      const playlists = await playlistsService.getPlaylists(query)
      res.send(playlists)
    } catch (error) {
      next(error)
    }
  }
}
