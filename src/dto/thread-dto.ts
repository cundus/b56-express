export interface CreateThreadDto {
  content?: string
  userId: number
  mainThreadId?: number
  images?: ThreadImage[]
}

export interface ThreadImage {
  url: string
}
