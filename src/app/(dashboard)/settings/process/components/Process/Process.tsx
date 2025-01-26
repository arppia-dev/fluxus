import { BpmnViewer } from '@/components/ui/BpmnViewer'
import { Card, Flex, message, PopconfirmProps, Typography } from 'antd'
import { ProcessProps } from './Process.types'

const { Text } = Typography

export default function Process({ data, index }: ProcessProps) {
  const [messageApi, contextHolder] = message.useMessage()

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    messageApi.success('Proceso eliminado')
  }

  return (
    <>
      {contextHolder}
      <Card>
        <Flex vertical gap={10}>
          <BpmnViewer xml={data.bpmn} index={index} />
          <Text strong>
            {data.id} - {data.name}
          </Text>
          <Text>{data.description}</Text>
        </Flex>
      </Card>
    </>
  )
}
