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
  const { token } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
