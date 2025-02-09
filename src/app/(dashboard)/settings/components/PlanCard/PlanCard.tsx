import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Flex, theme, Typography } from 'antd'
import { useState } from 'react'
import { PlanCardProps } from './PlanCard.types'

const { Text } = Typography

export default function PlanCard({ data, suscription }: PlanCardProps) {
  const { token } = theme.useToken()
  const [openDrawerPayment, setOpenDrawerPayment] = useState(false)

  const showDrawerPayment = () => {
    setOpenDrawerPayment(!openDrawerPayment)
  }

  return (
    <>
      <Card
        style={{
          width: '100%',
          borderColor: suscription ? token.colorPrimary : token.colorBorder,
          borderWidth: suscription ? token.lineWidth * 2 : token.lineWidth,
        }}
      >
        {suscription && (
          <CheckCircleOutlined
            style={{
              color: token.colorPrimary,
              fontSize: token.fontSizeHeading3,
              position: 'absolute',
              right: token.paddingLG,
            }}
          />
        )}
        <Flex vertical gap={10}>
          <Text strong>{data.name}</Text>
          <Text style={{ color: token.colorTextDescription }}>
            {data.description}
          </Text>
          <Text
            strong
            style={{ fontSize: token.fontSizeHeading3, margin: '0' }}
          >
            {data.billing.find((item) => item.billing === 'monthly')?.price}/Mes
          </Text>
          {/* <Flex vertical gap={10}>
          {data.points.map((point: string, index: number) => {
            return (
              <Space key={index}>
                <CheckCircleFilled style={{ color: token.colorPrimary }} />
                <Text>{point}</Text>
              </Space>
            )
          })}
        </Flex> */}
          <Button
            type="primary"
            block
            disabled={suscription}
            onClick={showDrawerPayment}
          >
            {suscription ? 'Plan Actual' : 'Obtener Ahora'}
          </Button>
        </Flex>
      </Card>
      <Drawer
        title="Create a new account"
        width={'30%'}
        onClose={showDrawerPayment}
        open={openDrawerPayment}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <pre>Prueba</pre>
      </Drawer>
    </>
  )
}
