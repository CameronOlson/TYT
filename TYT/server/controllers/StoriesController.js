import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'
import { storiesService } from '../services/StoriesService'

export class StoriesController extends BaseController {
  constructor () {
    super('api/stories')
    this.router
      .get('', this.getStories)
      .get('/:id', this.getStoryById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createStory)
      .put('/:id', this.editStory)
      .delete('/:id', this.removeStory)
  }

  async createStory(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const story = await storiesService.createStory(req.body)
      res.send(story)
    } catch (error) {
      next(error)
    }
  }

  async removeStory(req, res, next) {
    try {
      await storiesService.removeStory(req.params.id, req.userInfo.id)
      res.send("IT'S GONE FOREVER")
    } catch (error) {
      next(error)
    }
  }

  async editStory(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const story = await storiesService.editStory(req.body)
      res.send(story)
    } catch (error) {
      next(error)
    }
  }

  async getStoryById(req, res, next) {
    try {
      const story = await storiesService.getStoryById(req.params.id)
      res.send(story)
    } catch (error) {
      next(error)
    }
  }

  async getStories(req, res, next) {
    try {
      const regex = new RegExp(req.query.search, 'i')
      const query = { $or: [{ name: { $regex: regex } }, { storyTags: { $regex: regex } }] }
      logger.log(query)
      const stories = await storiesService.getStories(query)
      res.send(stories)
    } catch (error) {
      next(error)
    }
  }
}
