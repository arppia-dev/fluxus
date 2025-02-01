import {
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

const { Header: AntdHeader } = Layout
const { Text } = Typography

function getMenuItems(session: Session): MenuProps['items'] {
  return [
    {
      key: '4',
      label: (
        <>
          <Flex justify="center" align="center" vertical>
            <Text strong>{session?.user?.username}</Text>
            <Text>Cliente</Text>
            <Space>
              <MailOutlined />
              <Text>{session?.user?.email}</Text>
            </Space>
          </Flex>
        </>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '0',
      icon: <UserOutlined />,
      label: <Link href={'/profile'}>Profile</Link>,
    },
    {
      key: '1',
      icon: <SettingOutlined />,
      label: <Link href={'/profile'}>Settings</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <Button type="primary" block>
          Actualizar Plan
        </Button>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: (
        <Link href={'#'} onClick={() => signOut()}>
          Logout
        </Link>
      ),
    },
  ]
}

export default function Header({ collapsed, setCollapsed }: HeaderProps) {
  const { data: session } = useSession()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <AntdHeader style={{ padding: 0, background: colorBgContainer }}>
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
            menu={{ items: getMenuItems(session!) }}
            trigger={['click']}
            placement="bottomLeft"
          >
            <a onClick={(e) => e.preventDefault()}>
              {/* TODO: corregir estilos */}
              <Space style={{ paddingRight: '24px' }}>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined style={{ color: '#CCC', fontSize: '12px' }} />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>
    </AntdHeader>
  )
}
