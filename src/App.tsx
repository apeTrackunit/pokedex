import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {Outlet, useNavigate} from "react-router-dom";

const { Header, Sider, Content } = Layout;

export const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
      <Layout style={{height: "100vh"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              onSelect={e => {navigate(`/${e.key}`)}}
              items={[
                {
                  key: 'pokedex',
                  icon: <UserOutlined />,
                  label: 'Pokedex',
                },
                {
                  key: 'about',
                  icon: <VideoCameraOutlined />,
                  label: 'About',
                },
              ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
            />
          </Header>
          <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
              }}
          >
              <Outlet />
          </Content>
        </Layout>
      </Layout>
  );
};
export default App;
