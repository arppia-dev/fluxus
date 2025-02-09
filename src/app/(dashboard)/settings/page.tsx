'use client'

import { FolderOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { Col, Flex, Row, Space, Tabs, theme, Typography } from 'antd'
import { BillingTab } from './components/BillingTab'

const { Title } = Typography

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'General',
    children: 'Contenido de General',
  },
  {
    key: '2',
    label: 'Perfil',
    children: 'Contenido de Perfil',
  },
  {
    key: '3',
    label: 'Facturación',
    children: <BillingTab />,
  },
]

export default function SettingsPage() {
  const { token } = theme.useToken()

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <Flex vertical gap={10}>
      <Row>
        <Col>
          <Space>
            <FolderOutlined style={{ fontSize: token.fontSizeHeading2 }} />
            <Title level={2} style={{ margin: '0' }}>
              Ajustes
            </Title>
          </Space>
        </Col>
      </Row>
      <Tabs defaultActiveKey="3" items={items} onChange={onChange} />
    </Flex>
  )
}
