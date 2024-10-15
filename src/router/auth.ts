import { Router } from 'express'
import * as authController from '../controllers/auth'
import { authentication } from '../middlewares/authentication'
const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.get('/me', authentication, authController.authCheck)
authRouter.post('/forgot-password', authController.forgotPassword)
authRouter.post('/reset-password/:token', authController.resetPassword)

export default authRouter
