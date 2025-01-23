'use client'

import { API_PROCESS } from '@/utils/const'
import { fetcher, fetcherToken } from '@/utils/fetcher'
import { DeleteOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Skeleton,
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

  const { data: processes } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_URL}${API_PROCESS.LIST}`,
      session?.user?.token,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  if (status === 'loading') {
    return <Skeleton />
  }

  return (
    <>
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
            dataSource={processes?.data || []}
            rowKey="id"
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
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
                render: (description: any) => (
                  <div style={{ maxHeight: '100px' }}>
                    <BlocksRenderer content={description} />
                  </div>
                ),
              },
              {
                title: 'Actions',
                dataIndex: 'id',
                key: 'actions',
                render: (id: any) => (
                  <Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => {
                        router.push(`/settings/process/${id}`)
                      }}
                    />
                    <Popconfirm
                      title="¿Eliminar el proceso?"
                      description="Are you sure to delete this task?"
                      okText="Sí"
                      cancelText="No"
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
