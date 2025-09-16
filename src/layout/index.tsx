import { Layout, theme } from 'antd';

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderLayout from '../components/header';
import FooterLayout from '../components/footer';
import SiderLayout from '../components/sider';
const { Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pathName, setPathName] = useState('');
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
        <SiderLayout
          collapsed={collapsed}
          pathName={pathName}
        />
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