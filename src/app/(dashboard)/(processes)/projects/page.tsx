'use client'

import { DiagramSchema } from '@/types/DiagramSchema'
import { PayloadSchema } from '@/types/PayloadShema'
import { API_DIAGRAM } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import {
  CodeSandboxOutlined,
  FolderOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  Col,
  Flex,
  message,
  PaginationProps,
  PopconfirmProps,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import Search, { SearchProps } from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import qs from 'qs'
import { useState } from 'react'
import useSWR from 'swr'
import { DiagramCard } from './components/DiagramCard'
import ProjectCard from './components/ProjectCard/ProjectCard'

const { Title, Text } = Typography

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
        sort: ['updatedAt:desc'],
        pagination: {
          page: 1,
          pageSize: 4,
        },
        populate: {
          project: {
            fields: ['name'],
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    )
  }

  const buildQuery2 = (filter: string, pagination: PaginationProps) => {
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

  const { data: diagrams } = useSWR<PayloadSchema<DiagramSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_DIAGRAM}?${buildQuery(filter!, pagination)}`,
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
      {/* <pre>{JSON.stringify(diagrams, null, 2)}</pre> */}
      <Flex vertical gap={20}>
        <Row justify={'space-between'}>
          <Col>
            <Space>
              <FolderOutlined style={{ fontSize: '2rem' }} />
              <Title level={2} style={{ margin: '0' }}>
                Proyectos
              </Title>
            </Space>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Text strong style={{ color: '#757575' }}>
              Última edición
            </Text>
          </Col>
          {diagrams ? (
            diagrams?.data.map((process: DiagramSchema, index: number) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <DiagramCard data={process} index={index} />
              </Col>
            ))
          ) : (
            <Skeleton />
          )}
        </Row>
      </Flex>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row justify={'space-between'}>
        <Col span={12}>
          <Flex gap={5} align="center">
            <CodeSandboxOutlined style={{ fontSize: '2rem' }} />
            <Title level={2} style={{ margin: '0' }}>
              Process
            </Title>
          </Flex>
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
            <Button type="primary" icon={<PlusOutlined />}>
              Crear Proyecto
            </Button>
          </Space>
        </Col>
      </Row>
      <br />

      <br />
      <br />
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Flex gap={5}>
            <Text strong>Proyectos</Text>
            <Badge count={4} color="#757575" />
          </Flex>
        </Col>
        {[1, 2, 3, 4, 5].map((item: number) => (
          <Col xs={24} sm={12} lg={24} key={item}>
            <ProjectCard />
          </Col>
        ))}
      </Row>
    </>
  )
}
