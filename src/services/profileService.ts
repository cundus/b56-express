import { UpdateProfileDto } from '../dto/profile-dto'
import uploader from '../libs/cloudinary'
import * as userRepositories from '../repositories/user'
import * as profileRepositories from '../repositories/profile'

export const getProfile = async (username: string) => {
  return userRepositories.findUserAndProfile(username)
}

export const updateProfile = async (dto: UpdateProfileDto, id: number) => {
  await Promise.all(
    Object.entries(dto).map(async ([key, value]) => {
      if (typeof value !== 'string') {
        const url = (await uploader(value))[0].url

        dto[key] = url
      }
    })
  )

  return profileRepositories.updateProfile(dto, id)
}
