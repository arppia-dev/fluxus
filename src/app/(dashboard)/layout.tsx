'use client'

import {
  DashboardOutlined,
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
  Menu,
  MenuProps,
  Row,
  Space,
  theme,
  Typography,
} from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './page.module.css'

const { Header, Sider, Content } = Layout
const { Text } = Typography

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const items: MenuProps['items'] = [
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

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link href={'/'}>Dashboard</Link>,
            },
            {
              type: 'divider',
            },
            {
              key: '2',
              icon: <SettingOutlined />,
              label: <Link href={'/settings'}>Settings</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
                menu={{ items }}
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
