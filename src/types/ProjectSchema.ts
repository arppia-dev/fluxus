import { DiagramSchema } from './DiagramSchema'
import { GeneralSchema } from './GeneralSchema'
import { UserSchema } from './UserSchema'

export interface ProjectSchema extends GeneralSchema {
  name: string
  users: UserSchema[]
  diagrams: DiagramSchema[]
}
