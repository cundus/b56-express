import { Response, Request } from 'express'
import * as userServices from '../services/userService'

export const searchUser = async (req: Request, res: Response) => {
  try {
    const search = req.query.q as string
    const users = await userServices.searchUsers(search)

    res.json(users)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: (error as Error).message
    })
  }
}
