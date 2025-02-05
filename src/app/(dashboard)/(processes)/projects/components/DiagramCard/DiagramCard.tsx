import { BpmnViewer } from '@/components/ui/BpmnViewer'
import { FolderOutlined } from '@ant-design/icons'
import { Card, Flex, message, PopconfirmProps, theme, Typography } from 'antd'
import Link from 'next/link'
import { DiagramCardProps } from './DiagramCard.types'

const { Text } = Typography

export default function DiagramCard({ data, index }: DiagramCardProps) {
  const { token } = theme.useToken()
  const [messageApi, contextHolder] = message.useMessage()

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    messageApi.success('Proceso eliminado')
  }

  return (
    <>
      {contextHolder}
      <Card styles={{ body: { padding: 0 } }}>
        <Flex vertical>
          <BpmnViewer xml={data.bpmn} index={index} />
          <div style={{ padding: token.padding }}>
            <Flex vertical gap={5}>
              <Flex gap={5} align="center">
                <FolderOutlined style={{ color: token.colorTextSecondary }} />
                <Text style={{ color: token.colorTextSecondary }}>
                  {data.project ? data.project.name : 'Sin proyecto'}
                </Text>
              </Flex>
              <Flex vertical>
                <Link href={`/editor/${data.documentId}`}>
                  <Text strong>{data.name}</Text>
                </Link>
                <Text style={{ color: token.colorTextSecondary }}>
                  Edited 20 seconds ago
                </Text>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Card>
    </>
  )
}
