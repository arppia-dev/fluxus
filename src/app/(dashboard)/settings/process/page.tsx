'use client'

import { PayloadSchema } from '@/types/PayloadShema'
import { ProcessSchema } from '@/types/ProcessSchema'
import { API_PROCESS } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { ExportOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Flex,
  message,
  Pagination,
  PaginationProps,
  PopconfirmProps,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import Search, { SearchProps } from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { ProcessCard } from './components/ProcessCard'
import { useState } from 'react'
import qs from 'qs'

const { Title } = Typography

export default function ProcessPage() {
  const { data: session } = useSession()
  const [messageApi, contextHolder] = message.useMessage()
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

  const { data: processes } = useSWR<PayloadSchema<ProcessSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_PROCESS.LIST}?${buildQuery(filter!, pagination)}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    messageApi.success('Proceso eliminado')
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
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
    <>
      {contextHolder}
      <Row justify={'space-between'}>
        <Col span={12}>
          <Title level={1}>Process</Title>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Search
              placeholder="Filtro"
              allowClear
              onSearch={onSearch}
              onClear={() => {
                setFilter(null)
              }}
            />
            {/*
              TODO: añadir reporte de export
              <Button icon={<ExportOutlined />}>Exportar</Button>
            */}
            <Button type="primary">Añadir</Button>
          </Space>
        </Col>
      </Row>
      <Flex vertical gap={20}>
        <Row gutter={[20, 20]}>
          {processes ? (
            processes?.data.map((process: ProcessSchema, index: number) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <ProcessCard data={process} index={index} />
              </Col>
            ))
          ) : (
            <Skeleton />
          )}
        </Row>
        <Row>
          <Col xs={24}>
            <Pagination
              align="end"
              defaultCurrent={1}
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={processes?.meta?.pagination?.total}
              showSizeChanger
              pageSizeOptions={[12, 24, 48, 96]}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
            />
          </Col>
        </Row>
      </Flex>
    </>
  )
}
