import React,{useState} from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    PlusOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';

  const { Header, Sider, Content } = Layout;

export default function SidebarCyberbugs() {
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{position:'relative'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
            className='mt-5'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <PlusOutlined />,
              label: 'Create issue',
            },
            {
              key: '2',
              icon: <SearchOutlined />,
              label: 'Search',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{position:'absolute'}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            color:'white',
            right:'0%',
            fontSize:'30x'
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            
          }}
        >
        </Content>
      </Layout>
    </Layout>
  );
}
