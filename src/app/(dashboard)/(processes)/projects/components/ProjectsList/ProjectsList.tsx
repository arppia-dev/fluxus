import { DiagramSchema } from '@/types/DiagramSchema'
import { PayloadSchema } from '@/types/PayloadShema'
import { API_DIAGRAM, API_PROJECT } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import {
  AppstoreOutlined,
  BarsOutlined,
  CodeSandboxOutlined,
  FolderOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Badge,
  Button,
  Col,
  Flex,
  message,
  Pagination,
  PaginationProps,
  PopconfirmProps,
  Result,
  Row,
  Segmented,
  Skeleton,
  Space,
  theme,
  Typography,
} from 'antd'
import Search, { SearchProps } from 'antd/es/input/Search'
import { useSession } from 'next-auth/react'
import qs from 'qs'
import { useState } from 'react'
import useSWR from 'swr'
import { ProjectSchema } from '@/types/ProjectSchema'
import ProjectCard from '../ProjectCard/ProjectCard'

const { Text } = Typography

export default function ProjectsList() {
  const { token } = theme.useToken()
  const { data: session } = useSession()
  const [filter, setFilter] = useState<string | null>()
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 12,
  })

  const buildQuery2 = (filter: string, pagination: PaginationProps) => {
    return qs.stringify(
      {
        sort: ['name:asc'],
        filters: {
          name: {
            $containsi: filter,
          },
        },
        populate: {
          diagrams: {
            fields: ['id'],
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

  const { data: projects } = useSWR<PayloadSchema<ProjectSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_PROJECT}?${buildQuery2(filter!, pagination)}`,
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
            <Text strong>Proyectos</Text>
            <Badge
              count={projects && projects.meta?.pagination?.total}
              color={token.colorTextSecondary}
            />
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
        {!projects ? (
          <Skeleton />
        ) : projects && projects.data.length ? (
          projects?.data.map((project: ProjectSchema) => (
            <Col xs={24} sm={12} lg={24} key={project.documentId}>
              <ProjectCard data={project} />
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
            total={projects?.meta?.pagination?.total}
            showSizeChanger
            pageSizeOptions={[12, 24, 36, 100]}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        </Col>
      </Row>
      {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
    </Flex>
  )
}
