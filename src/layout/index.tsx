import { Layout, Menu, theme } from 'antd';

import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderLayout from '../components/header';
import FooterLayout from '../components/footer';
import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
const { Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pathName, setPathName] = useState('');
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation()
  useEffect(() => {
    const currentPath = location.pathname.split('/')[1]
    setPathName(currentPath ? currentPath : '/')
  }, [location.pathname])

  return (
    <>
      <Layout>
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
        <Layout>
          <HeaderLayout
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            colorBgContainer={colorBgContainer}
          />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          <FooterLayout />
        </Layout>
      </Layout>
    </>
  )
}
export default LayoutAdmin