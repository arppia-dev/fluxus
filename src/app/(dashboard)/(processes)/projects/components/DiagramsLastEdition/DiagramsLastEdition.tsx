import { DiagramSchema } from '@/types/DiagramSchema'
import { PayloadSchema } from '@/types/PayloadShema'
import { API_DIAGRAM } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { FolderOutlined } from '@ant-design/icons'
import {
  Col,
  Flex,
  message,
  Row,
  Skeleton,
  Space,
  theme,
  Typography,
} from 'antd'
import { useSession } from 'next-auth/react'
import qs from 'qs'
import useSWR from 'swr'
import { DiagramCard } from '../DiagramCard'

const { Text } = Typography

export default function DiagramsLastEdition() {
  const { token } = theme.useToken()
  const { data: session } = useSession()

  const buildQuery = () => {
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

  const { data: diagrams } = useSWR<PayloadSchema<DiagramSchema[]>>(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}${API_DIAGRAM}?${buildQuery()}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  if (!diagrams) {
    return <Skeleton />
  }

  return (
    <Flex vertical gap={10}>
      <Row>
        <Col>
          <Text strong style={{ color: token.colorTextSecondary }}>
            Última edición
          </Text>
        </Col>
      </Row>
      <Row gutter={10}>
        {diagrams?.data.map((process: DiagramSchema) => (
          <Col xs={24} sm={12} md={8} lg={6} key={process.id}>
            <DiagramCard data={process} />
          </Col>
        ))}
      </Row>
    </Flex>
  )
}
