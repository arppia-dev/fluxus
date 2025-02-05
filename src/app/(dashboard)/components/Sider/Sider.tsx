import { Layout, Menu } from 'antd'
import { items } from './Sider.data'
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
        items={items}
      />
    </AntdSider>
  )
}
