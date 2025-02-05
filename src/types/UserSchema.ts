import { ProcessSchema } from './ProcessSchema'

export interface UserSchema {
  id: number
  documentId: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  locale: string
}
