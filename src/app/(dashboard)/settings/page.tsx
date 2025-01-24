'use client'

import { Skeleton, Typography } from 'antd'
import { useSession } from 'next-auth/react'

const { Title } = Typography

export default function SettingsPage() {
  const { status } = useSession()

  if (status === 'loading') {
    return <Skeleton />
  }

  return (
    <>
      <Title level={1}>Settings</Title>
    </>
  )
}
