import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

interface IProps {
  collapsed: boolean;
  pathName: string;
}

const SiderLayout = (props: IProps) => {
  const { collapsed, pathName } = props
  const navigate = useNavigate()
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div>
        <h1 style={{ color: 'white', textAlign: 'center', padding: '16px' }}>
          {collapsed ? 'Logo' : 'Big Logo'}
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[`${pathName}`]}
        items={[
          {
            key: '/',
            icon: <MdDashboard />,
            label: 'Dashboard',
            onClick: () => navigate('/')
          },
          {
            key: 'user',
            icon: <FaUserAlt />,
            label: 'Users',
            onClick: () => navigate('/user')
          },
        ]}
      />
    </Sider>
  )
}

export default SiderLayout