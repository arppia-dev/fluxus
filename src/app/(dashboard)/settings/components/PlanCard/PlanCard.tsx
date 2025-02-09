import { CheckCircleFilled } from '@ant-design/icons'
import { Button, Card, Flex, Space, theme, Typography } from 'antd'
import { PlanCardProps } from './PlanCard.types'

const { Text } = Typography

export default function PriceCard({ data }: PlanCardProps) {
  const { token } = theme.useToken()

  return (
    <Card style={{ width: '100%' }}>
      <Flex vertical gap={10}>
        <Text strong>{data.name}</Text>
        <Text style={{ color: token.colorTextDescription }}>
          {data.description}
        </Text>
        <Text strong style={{ fontSize: token.fontSizeHeading3, margin: '0' }}>
          ${data.price} / Mes
        </Text>
        <Flex vertical gap={10}>
          {data.points.map((point: string, index: number) => {
            return (
              <Space key={index}>
                <CheckCircleFilled style={{ color: token.colorPrimary }} />
                <Text>{point}</Text>
              </Space>
            )
          })}
        </Flex>
        <Button type="primary" block>
          Obtener Ahora
        </Button>
      </Flex>
    </Card>
  )
}
