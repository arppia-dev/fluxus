'use client'

import { DiagramSchema } from '@/types/DiagramSchema'
import { PayloadSchema } from '@/types/PayloadShema'
import { API_DIAGRAM } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { FolderOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Flex,
  Pagination,
  PaginationProps,
  Result,
  Row,
  Skeleton,
  Space,
  theme,
  Typography,
} from 'antd'
import { SearchProps } from 'antd/es/input'
import Search from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import qs from 'qs'
import { useState } from 'react'
import useSWR from 'swr'
import { DiagramCard } from '../components/DiagramCard'

const { Title } = Typography

export default function DiagramPage() {
  const params = useParams<{ id: string }>()
  const { token } = theme.useToken()
  const { data: session } = useSession()
  const [filter, setFilter] = useState<string | null>()
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 12,
  })

  const buildQuery = (filter: string, pagination: PaginationProps) => {
    return qs.stringify(
      {
        sort: ['name:asc'],
        filters: {
          name: {
            $containsi: filter,
          },
          project: {
            documentId: {
              $eq: params.id,
            },
          },
        },
        populate: {
          project: {
            fields: ['name'],
          },
        },
        pagination: {
          page: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
      {
        encodeValuesOnly: true,
      },
    )
  }

  const { data: diagrams } = useSWR<PayloadSchema<DiagramSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_DIAGRAM}?${buildQuery(filter!, pagination)}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    setFilter(value)
  }

  const onChange: PaginationProps['onChange'] = (
    current: number,
    pageSize: number,
  ) => {
    setPagination({
      current,
      pageSize,
    })
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: number,
    pageSize: number,
  ) => {
    setPagination({
      current,
      pageSize,
    })
  }

  return (
    <Flex vertical gap={10}>
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <Space>
            <FolderOutlined style={{ fontSize: token.fontSizeHeading2 }} />
            <Title level={2} style={{ margin: '0' }}>
              Diagramas
            </Title>
          </Space>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="Filtro"
              allowClear
              onSearch={onSearch}
              onClear={() => {
                setFilter(null)
              }}
            />

            <Button type="primary" icon={<PlusOutlined />} />
          </Space>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        {!diagrams ? (
          <Skeleton />
        ) : diagrams && diagrams.data.length ? (
          diagrams?.data.map((diagram: DiagramSchema) => (
            <Col xs={24} sm={12} md={8} lg={6} key={diagram.id}>
              <DiagramCard data={diagram} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Result title="No se encontraron resultados" />
          </Col>
        )}
      </Row>
      <Row justify={'end'}>
        <Col>
          <Pagination
            defaultCurrent={1}
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={diagrams?.meta?.pagination?.total}
            showSizeChanger
            pageSizeOptions={[12, 24, 36, 100]}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        </Col>
      </Row>
    </Flex>
  )
}
