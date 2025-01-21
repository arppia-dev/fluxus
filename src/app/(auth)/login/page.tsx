import { Container } from '@/components/ui/Container'
import { Col, Row } from 'antd'
import { LoginForm } from '../components/LoginForm'

export default function LoginPage() {
  return (
    <Container
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}
