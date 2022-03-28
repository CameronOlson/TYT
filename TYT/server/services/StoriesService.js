import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class StoriesService {
  async createStory(body) {
    const story = await dbContext.Stories.create(body)
    await story.populate('creator', 'name picture')
    return story
  }

  async removeStory(id, userId) {
    const story = await this.getStoryById(id)
    if (story.creatorId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    // TODO do firebase nonsense
    await story.delete()
  }

  async editStory(body) {
    const story = await this.getStoryById(body.id)
    if (story.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('ACCESS DENIED')
    }
    story.name = body.name || story.name
    story.description = body.description || story.description
    story.storyArt = body.storyArt || story.storyArt
    await story.save()
    return story
  }

  async getStoryById(id) {
    const story = await dbContext.Stories.findById(id).populate('creator', 'name picture')
    if (!story) {
      throw new BadRequest('INVALID ID')
    }
    return story
  }

  async getStories(query = {}) {
    const stories = await dbContext.Stories.find(query).populate('creator', 'name picture')
    return stories
  }
}

export const storiesService = new StoriesService()
