import { Router } from 'express'
import * as threadController from '../controllers/thread'
import { authentication } from '../middlewares/authentication'
const likeRouter = Router()

likeRouter.post('/create', authentication, threadController.createThread)

export default likeRouter
