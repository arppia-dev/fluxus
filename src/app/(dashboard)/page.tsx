'use client'

import { CheckCircleFilled } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { useSession } from 'next-auth/react'

const { Text } = Typography

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Skeleton />
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Planes</h1>
          <br />
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        {[1, 2, 3, 4].map((item: any) => {
          return (
            <Col span={6} key={item}>
              <Card style={{ width: '100%' }}>
                <h3>Single Use</h3>
                <Text>
                  Use for single end product which end users can’t be charged
                  for.
                </Text>
                <Divider></Divider>
                <Space>
                  <h1>$49</h1>
                  <Text>one time pay</Text>
                </Space>
                <br />
                <br />
                <Flex vertical gap={10}>
                  <Space>
                    <CheckCircleFilled style={{ color: 'blue' }} />
                    <Text>Full source code</Text>
                  </Space>
                  <Space>
                    <CheckCircleFilled style={{ color: 'blue' }} />
                    <Text>Full source code</Text>
                  </Space>
                  <Space>
                    <CheckCircleFilled style={{ color: 'blue' }} />
                    <Text>Full source code</Text>
                  </Space>
                  <Text>Full source code</Text>
                  <Text>Full source code</Text>
                </Flex>
                <br />
                <br />
                <Button type="primary" block>
                  Purchase Now
                </Button>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
