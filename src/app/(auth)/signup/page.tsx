import Container from '@/components/ui/Container'
import { Col, Row } from 'antd'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  return (
    <Container
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  )
}
