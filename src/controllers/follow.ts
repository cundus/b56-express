import { Request, Response } from 'express'
import * as followService from '../services/followService'

export const createFollow = async (req: Request, res: Response) => {
  try {
    const followerId = res.locals.user.id
    const followingId = req.body.followingId
    const follow = await followService.createFollow(followerId, followingId)

    res.json({ message: follow })
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const checkFollow = async (req: Request, res: Response) => {
  try {
    const followerId = res.locals.user.id
    const followingId = +req.params.followingId
    const follow = await followService.checkFollow(followerId, followingId)
    res.json({
      isFollowing: !!follow
    })
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}
