import {
  BookOutlined,
  CalendarOutlined,
  DashboardOutlined,
  SettingOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import styles from './Sider.module.css'
import { SiderProps } from './Sider.types'

const { Sider: AntdSider } = Layout

export default function Sider({ collapsed }: SiderProps) {
  return (
    <AntdSider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link href={'/'}>Dashboard</Link>,
          },
          {
            key: '2',
            icon: <TagsOutlined />,
            label: <Link href={'/tasks'}>My Tasks</Link>,
          },
          {
            key: '3',
            icon: <CalendarOutlined />,
            label: <Link href={'/calendar'}>Calendar</Link>,
          },
          {
            key: '4',
            icon: <BookOutlined />,
            label: <Link href={'/reports'}>Reports</Link>,
          },
          {
            type: 'divider',
          },
          {
            key: '5',
            icon: <SettingOutlined />,
            label: <Link href={'/settings'}>Settings</Link>,
          },
        ]}
      />
    </AntdSider>
  )
}
