import { Router } from 'express'
import * as profileController from '../controllers/profile'
import { authentication } from '../middlewares/authentication'
import upload from '../middlewares/uploadFile'
const profileRouter = Router()

profileRouter.put(
  '/',
  authentication,
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1
    },
    {
      name: 'background',
      maxCount: 1
    }
  ]),
  profileController.updateProfile
)

export default profileRouter
