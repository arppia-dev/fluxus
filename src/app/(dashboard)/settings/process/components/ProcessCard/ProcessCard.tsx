import { BpmnViewer } from '@/components/ui/BpmnViewer'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Flex,
  message,
  Popconfirm,
  PopconfirmProps,
  Typography,
} from 'antd'
import Link from 'next/link'
import { ProcessProps } from './ProcessCard.types'

const { Text } = Typography

export default function ProcessCard({ data, index }: ProcessProps) {
  const [messageApi, contextHolder] = message.useMessage()

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    messageApi.success('Proceso eliminado')
  }

  return (
    <>
      {contextHolder}
      <Card style={{ height: '100%' }}>
        <Flex vertical gap={10}>
          <BpmnViewer xml={data.bpmn} index={index} />
          <Link href={`/editor/${data.id}`}>
            <Text strong>
              {data.id} - {data.name}
            </Text>
          </Link>
          <Text>{data.description}</Text>
          <Flex justify="end" gap={10}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => console.log()}
            ></Button>
            <Popconfirm
              title="Eliminar proceso"
              description="¿Esta seguro de eliminar el proceso?"
              onConfirm={confirm}
              okText="Sí"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => console.log()}
              ></Button>
            </Popconfirm>
          </Flex>
        </Flex>
      </Card>
    </>
  )
}
