import { CreateThreadDto } from '../dto/thread-dto'
import * as threadRepository from '../repositories/thread'

export const createThread = async (body: CreateThreadDto) => {
  const thread = await threadRepository.createThread(body)
  if (body.images) {
    await threadRepository.createThreadImages(body.images, thread.id)
  }

  return thread
}

export const getThread = async (id: number) => {
  return await threadRepository.findThreadById(id)
}

export const getThreads = async () => {
  return
}

export const getThreadsByLoggedInUser = async (userId: number, skip: number) => {
  return await threadRepository.findThreadByFollowerId(userId, skip)
}

export const getThreadsByUsername = async () => {
  return
}

export const getReplies = async () => {
  return
}
