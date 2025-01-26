export interface ProcessSchema {
  id: number
  documentId: string
  name: string
  description: string
  bpmn: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  locale: string
}
