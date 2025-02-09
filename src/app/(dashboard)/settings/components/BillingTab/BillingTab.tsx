import { PayloadSchema } from '@/types/PayloadShema'
import { PlanSchema } from '@/types/PlanSchema'
import { API_PLAN } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Row, Table, Typography } from 'antd'
import { useSession } from 'next-auth/react'
import qs from 'qs'
import useSWR from 'swr'
import { PlanCard } from '../PlanCard'

const { Title, Text } = Typography

export default function BillingTab() {
  const { data: session } = useSession()

  const buildQuery = () => {
    return qs.stringify(
      {
        sort: ['order:asc'],
        pagination: {
          page: 1,
          pageSize: 3,
        },
      },
      {
        encodeValuesOnly: true,
      },
    )
  }

  const { data: plans } = useSWR<PayloadSchema<PlanSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_PLAN}?${buildQuery()}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  return (
    <>
      <Flex vertical gap={10}>
        <Row gutter={[10, 10]}>
          {plans?.data.map((item: PlanSchema, index: number) => {
            return (
              <Col xs={24} sm={12} md={8} key={index}>
                <PlanCard data={item} />
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
