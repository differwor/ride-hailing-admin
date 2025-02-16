"use client";

import React, { useEffect, useState } from "react";
import { Button, Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Sidebar from "../../components/layout/Sidebar";
import "@ant-design/v5-patch-for-react-19";
import useUserStore from "@/store/useUserStore";
import { useSocketStore } from "@/store/useSocketStore";
import HeadingBar from "@/components/layout/HeadingBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { disconnect, connect } = useSocketStore();
  const { fetchUsers } = useUserStore();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetchUsers();
    connect();
    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer, display: "flex" }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <HeadingBar />
        </Header>
        <Content
          className="m-6 p-6"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
