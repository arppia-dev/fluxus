import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Row,
  Space,
  theme,
  Typography,
} from 'antd'
import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { HeaderProps } from './Header.types'
import { items } from './Header.data'

const { Header: AntdHeader } = Layout
const { Text } = Typography

export default function Header({ collapsed, setCollapsed }: HeaderProps) {
  const { token } = theme.useToken()
  const { data: session } = useSession()

  return (
    <AntdHeader style={{ padding: 0, background: token.colorBgContainer }}>
      <Row justify="space-between">
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Col>
        <Col>
          <Dropdown
            menu={{ items: items(session!) }}
            trigger={['click']}
            placement="bottomLeft"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Flex align="center" gap={10}>
                <Flex gap={10}>
                  <Button shape="circle" icon={<MailOutlined />} />
                  <Button shape="circle" icon={<BellOutlined />} />
                </Flex>
                <Divider type="vertical" />
                <Space align="center" style={{ paddingRight: '24px' }}>
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                    style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                  />
                  <Flex vertical gap={0}>
                    <Text strong>{session?.user?.username}</Text>
                    <Text>{session?.user?.email}</Text>
                  </Flex>
                  <DownOutlined style={{ color: '#CCC', fontSize: '12px' }} />
                </Space>
              </Flex>
            </a>
          </Dropdown>
        </Col>
      </Row>
    </AntdHeader>
  )
}
