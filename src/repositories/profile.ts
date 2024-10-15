import { UpdateProfileDto } from '../dto/profile-dto'
import { prisma } from '../libs/prisma'

export const updateProfile = async (body: UpdateProfileDto, id: number) => {
  const { username, ...rest } = body
  return await prisma.profile.update({
    where: {
      userId: id
    },
    data: {
      ...rest,
      user: {
        update: {
          username: username
        }
      }
    }
  })
}
