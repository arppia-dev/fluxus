import { DiagramSchema } from './DiagramSchema'
import { UserSchema } from './UserSchema'

export interface ProjectSchema {
  id: number
  documentId: string
  name: string
  users: UserSchema[]
  diagrams: DiagramSchema[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  locale: string
}
