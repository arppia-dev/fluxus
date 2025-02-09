import { DiagramSchema } from '@/types/DiagramSchema'

export type PlanSchema = {
  name: string
  description: string
  price: number
  points: string[]
}

export type PlanCardProps = {
  data: PlanSchema
}
