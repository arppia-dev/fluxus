import { GeneralSchema } from './GeneralSchema'
import { ProjectSchema } from './ProjectSchema'

export interface DiagramSchema extends GeneralSchema {
  name: string
  description: string
  bpmn: string
  project: ProjectSchema
}
