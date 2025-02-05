import { BpmnViewer } from '@/components/ui/BpmnViewer'
import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenFilled,
  FolderOutlined,
} from '@ant-design/icons'
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
      <Card styles={{ body: { padding: 0 } }}>
        <Flex vertical>
          <BpmnViewer xml={data.bpmn} index={index} />
          <div style={{ padding: '1rem' }}>
            <Flex vertical gap={5}>
              <Flex gap={5} align="center">
                <FolderOutlined style={{ color: '#757575' }} />
                <Text style={{ color: '#757575', fontSize: '0.7rem' }}>
                  Project Name
                </Text>
              </Flex>
              <Flex vertical>
                <Link href={`/editor/${data.id}`}>
                  <Text
                    strong
                    style={{
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {data.name}
                  </Text>
                </Link>
                <Text style={{ color: '#757575', fontSize: '0.7rem' }}>
                  Edited 20 seconds ago
                </Text>
              </Flex>
            </Flex>
          </div>

          {/*  <Flex justify="end" gap={10}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => console.log()}
            ></Button> */}
          {/*<Popconfirm
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
          </Flex> */}
        </Flex>
      </Card>
    </>
  )
}
