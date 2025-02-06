'use client'

import { FolderOutlined } from '@ant-design/icons'
import { Col, Flex, Row, Space, theme, Typography } from 'antd'
import { DiagramsLastEdition } from './components/DiagramsLastEdition'
import { ProjectsList } from './components/ProjectsList'

const { Title } = Typography

export default function ProcessPage() {
  const { token } = theme.useToken()

  return (
    <Flex vertical gap={10}>
      <Row>
        <Col>
          <Space>
            <FolderOutlined style={{ fontSize: token.fontSizeHeading2 }} />
            <Title level={2} style={{ margin: '0' }}>
              Proyectos
            </Title>
          </Space>
        </Col>
      </Row>
      <Flex vertical gap={20}>
        <DiagramsLastEdition />
        <ProjectsList />
      </Flex>
    </Flex>
  )
}
