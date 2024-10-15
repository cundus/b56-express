import { CreateThreadDto, ThreadImage } from '../dto/thread-dto'
import { prisma } from '../libs/prisma'

export const createThread = async (createThreadDto: CreateThreadDto) => {
  const { images, ...data } = createThreadDto

  return prisma.thread.create({
    data
  })
}

export const createThreadImages = async (images: ThreadImage[], id: number) => {
  return prisma.threadImage.createMany({
    data: images.map((image) => ({
      url: image.url,
      threadId: id
    }))
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
