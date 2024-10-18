import { Router } from 'express'
import * as likeController from '../controllers/like'
import { authentication } from '../middlewares/authentication'
const likeRouter = Router()

likeRouter.post('/', authentication, likeController.createLike)
likeRouter.get('/:threadId', authentication, likeController.checkLike)

export default likeRouter
