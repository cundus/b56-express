import { RegisterDto, UpdateUserDto } from '../dto/auth-dto'
import { prisma } from '../libs/prisma'

export const findUserByEmailOrUsername = async (usernameOrEmail: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    }
  })
}

export const createUser = async (registerDto: RegisterDto) => {
  return prisma.user.create({
    data: {
      email: registerDto.email,
      password: registerDto.password,
      username: registerDto.username!,
      profile: {
        create: {
          fullname: registerDto.fullname
        }
      }
    }
  })
}

export const findUserAndProfile = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username
    },
    select: {
      id: true,
      email: true,
      username: true,
      profile: true
    }
  })
}

export const searchUsers = async (query: string) => {
  return prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query } },
        {
          profile: {
            fullname: { contains: query }
          }
        },
        {
          profile: {
            bio: { contains: query }
          }
        }
      ]
    },
    include: {
      profile: true
    },

    take: 10 // == LIMIT
  })
}

export const updateUser = async (id: number, data: Partial<UpdateUserDto>) => {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })
}
