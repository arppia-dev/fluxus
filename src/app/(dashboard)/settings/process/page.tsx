'use client'

import { API_PROCESS } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { DeleteOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  message,
  Popconfirm,
  PopconfirmProps,
  Row,
  Space,
  Table,
  Typography,
} from 'antd'
import Search from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const { Title } = Typography

export default function ProcessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()

  const { data: processes } = useSWR(
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
      <Row>
        <Col span={24}>
          <Table
            rowKey="id"
            dataSource={processes?.data || []}
            loading={status === 'loading' && processes === undefined}
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: (id: number) => <a>{id}</a>,
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'Actions',
                key: 'actions',
                dataIndex: 'id',
                render: (id: number) => (
                  <Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => {
                        router.push(`/settings/process/${id}`)
                      }}
                    />
                    <Popconfirm
                      title="Eliminar proceso"
                      description="¿Estas seguro que quieres eliminar el proceso?"
                      placement="left"
                      okText="Sí"
                      cancelText="No"
                      onConfirm={confirm}
                    >
                      <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  )
}
