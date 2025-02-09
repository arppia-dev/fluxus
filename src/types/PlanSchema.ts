import { GeneralSchema } from './GeneralSchema'

export interface PlanSchema extends GeneralSchema {
  name: string
  description: string
  price: number
}
