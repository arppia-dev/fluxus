'use client'

import TimeSinceDate from '@/utils/relativeTime'
import {
  FolderOutlined,
  MoreOutlined,
  ProductOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Space,
  theme,
  Tooltip,
  Typography,
} from 'antd'
import { ProjectCardProps } from './ProjectCard.types'

const { Text } = Typography

export default function ProjectCard({ data }: ProjectCardProps) {
  const { token } = theme.useToken()

  return (
    <Card styles={{ body: { padding: token.padding } }}>
      <Row align={'middle'} gutter={[undefined, { xs: 2, sm: 0 }]}>
        <Col xs={{ span: 22, order: 1 }} lg={{ span: 10, order: 1 }}>
          <Space>
            <FolderOutlined />
            <Text strong style={{ textTransform: 'capitalize' }}>
              {data.name}
            </Text>
          </Space>
        </Col>
        <Col xs={{ span: 24, order: 3 }} lg={{ span: 4, order: 2 }}>
          <Space>
            <ProductOutlined />
            <Text
              style={{
                color: token.colorTextSecondary,
                fontSize: token.fontSizeSM,
              }}
            >
              {`${data.diagrams.length} Diagrama${data.diagrams.length > 1 ? 's' : ''}`}
            </Text>
          </Space>
        </Col>
        <Col xs={{ span: 24, order: 3 }} lg={{ span: 4, order: 2 }}>
          <Text
            style={{
              color: token.colorTextSecondary,
              fontSize: token.fontSizeSM,
            }}
          >
            Editado hace {TimeSinceDate(data.updatedAt)}
          </Text>
        </Col>
        <Col xs={{ span: 24, order: 3 }} lg={{ span: 4, order: 2 }}>
          <Avatar.Group max={{ count: 4 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
              <Avatar
                key={item}
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item}`}
              />
            ))}
            <Tooltip title="Ant User" placement="top" />
          </Avatar.Group>
        </Col>
        <Col
          xs={{ span: 2, order: 2 }}
          lg={{ span: 2, order: 3 }}
          style={{ textAlign: 'right' }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Col>
      </Row>
    </Card>
  )
}
