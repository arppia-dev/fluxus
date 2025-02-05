import {
  ApartmentOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import Link from 'next/link'

export const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: <Link href={'/'}>Panel</Link>,
  },
  {
    key: '2',
    icon: <FileDoneOutlined />,
    label: <Link href={'/tasks'}>Tareas</Link>,
  },
  {
    key: '3',
    icon: <CalendarOutlined />,
    label: <Link href={'/calendar'}>Calendario</Link>,
  },
  {
    key: '4',
    icon: <ApartmentOutlined />,
    label: 'Procesos',
    children: [
      {
        key: '4-1',
        label: <Link href={'/processes/projects'}>Proyectos</Link>,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '5',
    icon: <SettingOutlined />,
    label: <Link href={'/settings'}>Ajustes</Link>,
  },
]
