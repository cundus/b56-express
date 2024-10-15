import { Router } from 'express'
import authRouter from './auth'
import threadRouter from './thread'
import likeRouter from './like'
import followRouter from './follow'
import profileRouter from './profile'
import userRouter from './user'
const router = Router()

router.get('/', (req, res) => {
  res.send('ROOT ROUTER Express APP')
})

router.use('/auth', authRouter)
router.use('/threads', threadRouter)
router.use('/like', likeRouter)
router.use('/follow', followRouter)
router.use('/profile', profileRouter)
router.use('/user', userRouter)

export default router
