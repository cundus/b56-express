import { Request, Response } from 'express'
import * as threadService from '../services/threadService'
import { CreateThreadDto } from '../dto/thread-dto'
import uploader from '../libs/cloudinary'

export const createThread = async (req: Request, res: Response) => {
  try {
    const body: CreateThreadDto = req.body

    body.userId = res.locals.user.id
    if (req.files) {
      body.images = await uploader(req.files as Express.Multer.File[])
    }

    const thread = await threadService.createThread(body)
    res.json(thread)
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const getThreads = async (req: Request, res: Response) => {
  try {
    const threads = await threadService.getThreads()
    res.json(threads)
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const detailThread = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const thread = await threadService.getThread(+id)
    res.json(thread)
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const feed = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const skip = req.query.skip ? +req.query.skip : 0
    console.log(skip)

    const threads = await threadService.getThreadsByLoggedInUser(userId, skip)
    res.json(threads)
  } catch (error) {
    console.log(error)
    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}
