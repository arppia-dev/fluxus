import {
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Flex, Space, Typography } from 'antd'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const { Text } = Typography

export const items = (session: Session): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <Flex vertical justify="center" align="center" gap={5}>
        <Avatar
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
          size={100}
          style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
        />
        <Flex vertical align="center" gap={-10}>
          <Text strong>{session?.user?.username}</Text>
          <Text>Cliente</Text>
          <Space>
            <MailOutlined />
            <Text>{session?.user?.email}</Text>
          </Space>
        </Flex>
      </Flex>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: <Link href={'/profile'}>Perfil</Link>,
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: <Link href={'/profile'}>Ajustes</Link>,
  },
  {
    type: 'divider',
  },
  {
    key: '4',
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
    key: '5',
    icon: <LogoutOutlined />,
    label: (
      <Link href={'#'} onClick={() => signOut()}>
        Cerrar Sesión
      </Link>
    ),
  },
]
