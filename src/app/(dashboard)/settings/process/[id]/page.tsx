'use client'

import { fetcherToken } from '@/utils/fetcher'
import { Block } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import { Skeleton, Tabs, TabsProps } from 'antd'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import qs from 'qs'
import { useState } from 'react'
import useSWR from 'swr'
import BpmnViewer from './components/BpmnViewer'

export default function ProcessPage() {
  const { data: session } = useSession()
  const params = useParams<{ id: string }>()

  const query = qs.stringify(
    {
      filters: {
        id: {
          $eq: params.id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  const { data: processData } = useSWR(
    session && [
      `${process.env.NEXT_PUBLIC_API_URL}/api/processes?${query}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Formulario',
      style: { height: '800px' },
      children: <>Formulario</>,
    },
    {
      key: '2',
      label: 'Editor',
      style: { height: '800px' },
      children: <BpmnViewer xml={processData?.data[0]?.bpmn} />,
    },
  ]

  if (!processData && processData?.data[0]?.bpmn == undefined) {
    return <Skeleton />
  }

  if (processData.data.length === 0) {
    return <pre>No hay registro del proceso</pre>
  }

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
