import * as userRepositories from '../repositories/user'

export const searchUsers = async (query: string) => {
  return await userRepositories.searchUsers(query)
}
