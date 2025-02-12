'use client'

import React, { useState } from 'react';
import { AuthProvider } from '@/app/_context/AuthContext';
import { Button, Layout, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import Sidebar from '../../components/layout/Sidebar';
import '@ant-design/v5-patch-for-react-19';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      <Layout>
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed}>
          <Sidebar />
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
            className='m-6 p-6'
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthProvider>
  );
}