import * as likeRepositories from '../repositories/like'

export const createLike = async (userId: number, threadId: number) => {
  const exist = await likeRepositories.findLike(userId, threadId)

  if (exist) {
    await likeRepositories.deleteLike(userId, threadId)
    return 'Unliked'
  }

  await likeRepositories.createLike(userId, threadId)
  return 'Liked'
}

export const checkLike = async (userId: number, threadId: number) => {
  return await likeRepositories.findLike(userId, threadId)
}
