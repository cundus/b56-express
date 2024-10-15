import { Request, Response } from 'express'
import * as profileService from '../services/profileService'
import { UpdateProfileDto } from '../dto/profile-dto'

export const getProfile = async (req: Request, res: Response) => {
  try {
    const username = req.params.username

    const profile = await profileService.getProfile(username)

    res.json(profile)
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user.id
    const body: UpdateProfileDto = req.body

    if (req.files) {
      const files = req.files as { [key: string]: Express.Multer.File[] }
      Object.keys(files).map((key) => {
        body[key] = files[key]
      })
    }

    const profile = await profileService.updateProfile(body, id)

    res.json({
      message: 'Profile updated'
    })
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}
