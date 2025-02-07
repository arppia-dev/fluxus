import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

export const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <EditOutlined />,
    label: 'Editar',
  },
  {
    key: '2',
    icon: <DeleteOutlined />,
    label: 'Eliminar',
  },
]
