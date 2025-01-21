'use client'

import { fetcher, fetcherToken } from '@/utils/fetcher'
import { ExportOutlined } from '@ant-design/icons'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { Button, Col, Row, Skeleton, Space, Table, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const { Title } = Typography

export default function ProcessPage() {
  const { data: session, status } = useSession()

  const { data: processes } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/api/processes`, session?.user?.token],
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
            ]}
          />
        </Col>
      </Row>
    </>
  )
}
