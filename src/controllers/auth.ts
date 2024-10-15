import { NextFunction, Request, Response } from 'express'
import * as authServices from '../services/authService'
import * as profileServices from '../services/profileService'

import { LoginDto, RegisterDto } from '../dto/auth-dto'

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const dataUserForLogin = req.body as LoginDto

    const token = await authServices.login(dataUserForLogin)

    res.json({
      token
    })
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const bodyRegister = req.body as RegisterDto

    const user = await authServices.register(bodyRegister)

    res.json({
      user
    })
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user

    const profile = await profileServices.getProfile(user.username)

    res.json(profile)
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const email = req.body.email

    await authServices.forgotPassword(email)

    res.json({
      message: 'Reset password link has been sent to your email'
    })
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token
    const password = req.body.password

    await authServices.resetPassword(token, password)

    res.json({
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.log(error)

    const err = error as Error
    res.status(500).json({
      message: err.message
    })
  }
}
