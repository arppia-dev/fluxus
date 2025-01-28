'use client'

import { Card, Col, Flex, Row, Typography } from 'antd'
import Link from 'next/link'
import styles from './page.module.css'

const { Title, Text } = Typography

export default function SettingsPage() {
  const modulosProcesos = [
    {
      title: 'Procesos',
      description: 'Configuración de procesos',
      link: '/settings/process',
    },
    {
      title: 'Requisitos',
      description: 'Configuración de requisitos',
      link: '/settings/requirements',
    },
    {
      title: 'Formularios',
      description: 'Configuración de formularios',
      link: '/settings/forms',
    },
  ]

  return (
    <>
      <Flex vertical gap={20}>
        <Text strong>Modulos de Procesos</Text>
        <Row gutter={20}>
          {modulosProcesos.map((modulo) => (
            <Col xs={6} key={modulo.title}>
              <Link href={modulo.link}>
                <Card className={styles.moduleCard}>
                  <Title level={5}>{modulo.title}</Title>
                  <Text>{modulo.description}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Flex>
    </>
  )
}
