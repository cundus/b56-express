import { Router } from 'express'
import { authentication } from '../middlewares/authentication'
import * as followController from '../controllers/follow'
const followRouter = Router()

followRouter.post('/', authentication, followController.createFollow)
followRouter.get('/:followingId', authentication, followController.checkFollow)

export default followRouter
