'use client'

import Container from '@/components/ui/Container'
import { Col, Row } from 'antd'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Login() {
  return (
    <Container
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          Dashboard
          <br />
          <Link href={'#'} onClick={() => signOut()}>
            Cerrar Sesion
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
