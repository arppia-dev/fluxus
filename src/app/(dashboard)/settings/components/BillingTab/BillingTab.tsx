import { Button, Col, Flex, Row, Table, Typography } from 'antd'
import { PriceCard } from '../PlanCard'
import { PlanSchema } from '../PlanCard/PlanCard.types'
import { DownloadOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const plans: PlanSchema[] = [
  {
    name: 'Free plan',
    description:
      'For individuals and small teams looking to manage their tasks.',
    price: 0,
    points: [
      '2 GB of cloud storage',
      'Locally stored files',
      '1 individual user',
      '1 devices synced',
    ],
  },
  {
    name: 'Basic plan',
    description:
      'For individuals and small teams looking to manage their tasks.',
    price: 10,
    points: [
      '10 GB of cloud storage',
      'Locally stored files',
      'Up 5 individual user',
      'Up 5 devices synced',
    ],
  },
  {
    name: 'Pro plan',
    description:
      'For individuals and small teams looking to manage their tasks.',
    price: 20,
    points: [
      '50 GB of cloud storage',
      'Locally stored files',
      'Up 15 individual user',
      'Up 30 devices synced',
    ],
  },
]

export default function BillingTab() {
  return (
    <>
      <Flex vertical gap={10}>
        <Row gutter={[10, 10]}>
          {plans.map((item: PlanSchema, index: number) => {
            return (
              <Col xs={24} sm={12} md={8} key={index}>
                <PriceCard data={item} />
              </Col>
            )
          })}
        </Row>
        <Row>
          <Col>
            <Title level={5}>Historial de Facturación</Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={[
                { key: '1', title: 'Factura', dataIndex: 'name' },
                { key: '2', title: 'Fecha', dataIndex: 'date' },
                { key: '3', title: 'Plan', dataIndex: 'plan' },
                {
                  key: '4',
                  title: 'Precio',
                  dataIndex: 'price',
                  render: (value) => (
                    <>
                      <Text>${value.toFixed(2)}</Text>
                    </>
                  ),
                },
                {
                  key: '5',
                  title: '',
                  dataIndex: '',
                  render: (value, record) => (
                    <Button
                      type={'text'}
                      onClick={() => {
                        console.log('descargando')
                      }}
                    >
                      <DownloadOutlined />
                    </Button>
                  ),
                },
              ]}
              dataSource={[
                {
                  key: '1',
                  name: 'Invoice 0001',
                  date: 32,
                  plan: 'Basic',
                  price: 10,
                },
                {
                  key: '2',
                  name: 'Invoice 0002',
                  date: 32,
                  plan: 'Basic',
                  price: 10,
                },
                {
                  key: '3',
                  name: 'Invoice 0003',
                  date: 32,
                  plan: 'Pro',
                  price: 20,
                },
              ]}
            ></Table>
          </Col>
        </Row>
      </Flex>
    </>
  )
}
