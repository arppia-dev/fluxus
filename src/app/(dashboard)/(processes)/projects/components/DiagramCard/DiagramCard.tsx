import { BpmnViewer } from '@/components/ui/BpmnViewer'
import { FolderOutlined } from '@ant-design/icons'
import { Card, Flex, theme, Typography } from 'antd'
import Link from 'next/link'
import { DiagramCardProps } from './DiagramCard.types'
import TimeSinceDate from '@/utils/relativeTime'

const { Text } = Typography

export default function DiagramCard({ data }: DiagramCardProps) {
  const { token } = theme.useToken()

  return (
    <Card styles={{ body: { padding: 0 } }}>
      <Flex vertical>
        <BpmnViewer xml={data.bpmn} index={data.documentId} />
        <div style={{ padding: token.padding, textTransform: 'capitalize' }}>
          <Flex vertical gap={5}>
            <Flex gap={5} align="center">
              <FolderOutlined style={{ color: token.colorTextSecondary }} />
              <Text
                style={{
                  color: token.colorTextSecondary,
                  fontSize: token.fontSizeSM,
                }}
              >
                {data.project ? data.project.name : 'Sin proyecto'}
              </Text>
            </Flex>
            <Flex vertical>
              <Link href={`/editor/${data.documentId}`}>
                <Text strong>{data.name}</Text>
              </Link>
              <Text
                style={{
                  color: token.colorTextSecondary,
                  fontSize: token.fontSizeSM,
                }}
              >
                Editado hace {TimeSinceDate(data.updatedAt)}
              </Text>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Card>
  )
}
