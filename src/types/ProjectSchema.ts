import { ProcessSchema } from './DiagramSchema'
import { UserSchema } from './UserSchema'

export interface ProjectSchema {
  id: number
  documentId: string
  name: string
  assigned: UserSchema[]
  processes: ProcessSchema[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  locale: string
}
