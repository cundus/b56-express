import { Request, Response } from 'express'
import * as likeService from '../services/likeService'
import * as likeRepositories from '../repositories/like'

export const createLike = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const threadId = req.body.threadId
    const like = await likeService.createLike(userId, threadId)

    res.json({ message: like })
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const checkLike = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const threadId = +req.params.threadId
    const like = await likeService.checkLike(userId, threadId)
    const likeCount = await likeRepositories.countLikes(threadId)
    res.json({
      isLiked: !!like,
      count: likeCount
    })
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}
