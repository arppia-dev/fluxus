'use client'

import { Alert, Button, Form, Input } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [loginForm] = Form.useForm()
  const [errorLogin, setErrorLogin] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onFinishLogin = async (values: { email: string; password: string }) => {
    setLoading(true)

    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    if (response?.error) {
      setErrorLogin(response.error)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <>
      {errorLogin && (
        <Alert
          message={errorLogin}
          type="error"
          showIcon
          closable
          onClose={() => {
            setErrorLogin(null)
          }}
        />
      )}
      <Form
        form={loginForm}
        name="login"
        layout="vertical"
        onFinish={onFinishLogin}
        initialValues={{
          ['email']: '',
          ['password']: '',
        }}
      >
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'El correo electrónico es requerido',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: 'La contraseña es requerida' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            onClick={loginForm.submit}
          >
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
