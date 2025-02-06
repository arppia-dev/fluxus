'use client'

import {
  FolderOutlined,
  MoreOutlined,
  ProductOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Col, Flex, Row, theme, Tooltip, Typography } from 'antd'
import { ProjectCardProps } from './ProjectCard.types'
import TimeSinceDate from '@/utils/relativeTime'

const { Text } = Typography

export default function ProjectCard({ data }: ProjectCardProps) {
  const { token } = theme.useToken()

  return (
    <Card styles={{ body: { padding: '0.5rem 1rem' } }}>
      <Row
        align={'middle'}
        gutter={[
          { xs: 0, sm: 0, md: 0, lg: 0 },
          { xs: 5, sm: 0, md: 0, lg: 0 },
        ]}
      >
        <Col xs={24} sm={24} lg={10}>
          <Flex gap={10} align="center">
            <FolderOutlined />
            <Text strong style={{ textTransform: 'capitalize' }}>
              {data.name}
            </Text>
          </Flex>
        </Col>
        <Col xs={24} sm={24} lg={4}>
          <Flex gap={5}>
            <ProductOutlined />
            <Text
              style={{
                color: token.colorTextSecondary,
                fontSize: token.fontSizeSM,
              }}
            >
              {`${data.diagrams.length} Diagrama${data.diagrams.length !== 1 ? 's' : ''}`}
            </Text>
          </Flex>
        </Col>
        <Col xs={24} sm={24} lg={5}>
          <Text
            style={{
              color: token.colorTextSecondary,
              fontSize: token.fontSizeSM,
            }}
          >
            Editado hace {TimeSinceDate(data.updatedAt)}
          </Text>
        </Col>
        <Col xs={24} sm={24} lg={5}>
          <Flex justify="space-between">
            <Avatar.Group max={{ count: 4 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
                <Avatar
                  key={item}
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item}`}
                />
              ))}
              <Tooltip title="Ant User" placement="top" />
            </Avatar.Group>
            <MoreOutlined />
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}
