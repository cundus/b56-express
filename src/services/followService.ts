import * as followRepositories from '../repositories/follow'

export const createFollow = async (followerId: number, followingId: number) => {
  const exist = await followRepositories.findFollow(followerId, followingId)

  if (exist) {
    await followRepositories.deleteFollow(followerId, followingId)
    return 'Unfollowed successfully'
  }

  await followRepositories.createFollow(followerId, followingId)
  return 'Followed successfully'
}

export const checkFollow = async (followerId: number, followingId: number) => {
  return await followRepositories.findFollow(followerId, followingId)
}
