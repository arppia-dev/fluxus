'use client'

import { API_PROCESS } from '@/utils/const'
import { fetcher, fetcherToken } from '@/utils/fetcher'
import { Tabs, TabsProps } from 'antd'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import BpmnViewer from './components/BpmnViewer'
import qs from 'qs'

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
      encodeValuesOnly: true, // prettify URL
    },
  )

  const { data: processData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/processes?${query}`,
    fetcher,
    //([url, token]) => fetcherToken(url, token as string),
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
        <>
          {processData && processData?.data[0]?.bpmn != undefined && (
            <BpmnViewer xml={processData?.data[0]?.bpmn} />
          )}
        </>
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
