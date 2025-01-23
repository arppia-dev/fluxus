'use client'

import { API_PROCESS } from '@/utils/const'
import { fetcherToken } from '@/utils/fetcher'
import { Skeleton, Tabs, TabsProps } from 'antd'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import BpmnViewer from './components/BpmnViewer'

export default function ProcessPage() {
  const { data: session, status } = useSession()
  const params = useParams<{ id: string }>()

  const { data: processData } = useSWR(
    session
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}${API_PROCESS.GET}/?filters[id][$eq]=${params.id}`,
          session?.user?.token,
        ]
      : null,
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
      children: 'Formulario',
    },
    {
      key: '2',
      label: 'Editor',
      style: { height: '100%' },
      children: (
        <>{processData && <BpmnViewer xml={processData?.data[0].bpmn} />}</>
      ),
    },
  ]

  return (
    <>
      <Tabs
        defaultActiveKey="2"
        items={items}
        onChange={onChange}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  )
}
