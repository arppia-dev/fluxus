import { ProcessSchema } from './DiagramSchema'

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
