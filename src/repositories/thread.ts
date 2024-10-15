import { CreateThreadDto } from '../dto/thread-dto'
import { prisma } from '../libs/prisma'

export const createThread = async (createThreadDto: CreateThreadDto) => {
  return prisma.thread.create({
    data: {
      ...createThreadDto,
      mainThreadId: createThreadDto.mainThreadId ? +createThreadDto.mainThreadId : null,
      images: {
        createMany: {
          data: createThreadDto.images!.map((image) => ({ url: image.url }))
        }
      }
    }
  })
}

export const findThreadById = async (id: number) => {
  return prisma.thread.findUnique({
    where: {
      id
    },
    include: {
      images: true,
      user: {
        select: {
          id: true,
          username: true,
          profile: true
        }
      },
      _count: {
        select: {
          replies: true,
          likes: true
        }
      }
    }
  })
}

export const findThreadByFollowerId = async (id: number, skip: number) => {
  return prisma.thread.findMany({
    where: {
      OR: [
        {
          user: {
            following: {
              some: {
                followerId: id
              }
            }
          }
        },
        {
          userId: id
        }
      ],
      mainThreadId: null
    },
    include: {
      images: true,
      user: {
        select: {
          id: true,
          username: true,
          profile: true
        }
      },
      _count: {
        select: {
          replies: true,
          likes: true
        }
      }
    },
    take: 10,
    skip: skip
  })
}
