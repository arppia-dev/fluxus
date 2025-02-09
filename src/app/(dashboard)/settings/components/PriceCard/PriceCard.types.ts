import { DiagramSchema } from '@/types/DiagramSchema'

export type PriceSchema = {
  name: string
  description: string
  price: number
  points: string[]
}

export type PriceCardProps = {
  data: PriceSchema
}
