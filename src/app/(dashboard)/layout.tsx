'use client'

import { Layout, theme } from 'antd'
import React, { useState } from 'react'
import Header from './components/Header/Header'
import Sider from './components/Sider/Sider'

const { Content } = Layout

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
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
