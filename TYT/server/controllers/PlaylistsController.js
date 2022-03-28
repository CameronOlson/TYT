import { playlistsService } from '../services/PlaylistsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class PlaylistsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('', this.getPlaylists)
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
