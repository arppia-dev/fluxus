import { ProjectSchema } from './ProjectSchema'

export interface DiagramSchema {
  id: number
  documentId: string
  name: string
  description: string
  bpmn: string
  project: ProjectSchema
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  locale: string
}
