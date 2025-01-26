'use client'

import { PayloadSchema } from '@/types/PayloadShema'
import { ProcessSchema } from '@/types/ProcessSchema'
import { API_PROCESS } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { ExportOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  message,
  PopconfirmProps,
  Row,
  Space,
  Typography,
} from 'antd'
import Search from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Process } from './components/Process'

const { Title } = Typography

export default function ProcessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()

  const { data: processes } = useSWR<PayloadSchema<ProcessSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_PROCESS.LIST}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    messageApi.success('Proceso eliminado')
  }

  return (
    <>
      {contextHolder}
      <Row justify={'space-between'}>
        <Col span={12}>
          <Title level={1}>Process</Title>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Search placeholder="Filtro"></Search>
            <Button icon={<ExportOutlined />}>Exportar</Button>
            <Button type="primary">Añadir</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        {processes &&
          processes?.data.map((process: ProcessSchema, index: number) => (
            <Col span={6} key={index}>
              <Process data={process} index={index} />
            </Col>
          ))}
      </Row>
    </>
  )
}
