import { Router } from 'express'
import * as userController from '../controllers/user'
import { authentication } from '../middlewares/authentication'
const userRouter = Router()

userRouter.get('/search', authentication, userController.searchUser)

export default userRouter
