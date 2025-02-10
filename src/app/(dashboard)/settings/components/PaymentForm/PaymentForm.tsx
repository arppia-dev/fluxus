import { Form, Select, Button } from 'antd'

export default function PaymentForm() {
  const { Option } = Select

  const onFinish = (values: any) => {
    console.log('Received values:', values)
  }

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="plan"
        label="Plan"
        rules={[{ required: true, message: 'Please select a plan!' }]}
      >
        <Select placeholder="Selecciona un plan">
          <Option value="basic">Basic</Option>
          <Option value="premium">Premium</Option>
          <Option value="enterprise">Enterprise</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="billingMethod"
        label="Billing Method"
        rules={[{ required: true, message: 'Please select a billing method!' }]}
      >
        <Select placeholder="Select a billing method">
          <Option value="monthly">Monthly</Option>
          <Option value="annual">Annual</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
