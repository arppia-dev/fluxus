'use client'

import { Col, Row, Typography } from 'antd'

const { Title } = Typography

export default function DashboardPage() {
  return (
    <>
      <Row>
        <Col>
          <Title level={2}>Dashboard</Title>
        </Col>
      </Row>
    </>
  )
}
