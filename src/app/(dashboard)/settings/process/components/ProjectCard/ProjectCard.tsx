'use client'

import {
  FolderOutlined,
  MoreOutlined,
  ProductOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Col, Flex, Row, Tooltip, Typography } from 'antd'

const { Text } = Typography

export default function ProjectCard() {
  return (
    <Card styles={{ body: { padding: '0.5rem 1rem' } }}>
      <Row
        align={'middle'}
        gutter={[
          { xs: 0, sm: 0, md: 0, lg: 0 },
          { xs: 0, sm: 0, md: 0, lg: 0 },
        ]}
      >
        <Col xs={24} sm={24} lg={10}>
          <Flex gap={10} align="center">
            <FolderOutlined />
            <Text strong>Project Name</Text>
          </Flex>
        </Col>
        <Col xs={24} sm={24} lg={4}>
          <Flex gap={5}>
            <ProductOutlined />
            <Text strong style={{ color: '#757575', fontSize: '0.7rem' }}>
              1 Diagrams
            </Text>
          </Flex>
        </Col>
        <Col xs={24} sm={24} lg={5}>
          <Text style={{ color: '#757575', fontSize: '0.7rem' }}>
            Edited 20 seconds ago
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
