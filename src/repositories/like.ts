import { prisma } from '../libs/prisma'

export const createLike = async (userId: number, threadId: number) => {
  return await prisma.likes.create({
    data: {
      userId,
      threadId
    }
  })
}

export const deleteLike = async (userId: number, threadId: number) => {
  return await prisma.likes.delete({
    where: {
      threadId_userId: {
        threadId,
        userId
      }
    }
  })
}

export const findLike = async (userId: number, threadId: number) => {
  return await prisma.likes.findUnique({
    where: {
      threadId_userId: {
        threadId,
        userId
      }
    }
  })
}

export const countLikes = async (threadId: number) => {
  return await prisma.likes.count({
    where: {
      threadId
    }
  })
}
