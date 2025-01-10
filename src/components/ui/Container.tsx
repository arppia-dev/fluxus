import { Col, Row } from 'antd'
import { CSSProperties } from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties | undefined
}

export default function Container({
  children,
  className,
  style,
}: ContainerProps) {
  return (
    <Row className={className} style={style}>
      <Col xs={1} xl={2} xxl={4}></Col>
      <Col xs={22} xl={20} xxl={16}>
        {children}
      </Col>
      <Col xs={1} xl={2} xxl={4}></Col>
    </Row>
  )
}
