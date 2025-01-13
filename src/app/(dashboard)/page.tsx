'use client'

import { Container } from '@/components/ui/Container'
import { Col, Row } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = useSession()

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
          {session ? (
            <div>
              <p>Bienvenido, {session.user?.name}</p>
              <p>Email: {session.user?.email}</p>

              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          ) : (
            <p>No has iniciado sesión</p>
          )}
          <br />
          <Link href={'#'} onClick={() => signOut()}>
            Cerrar Sesion
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
