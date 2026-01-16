import React, { useState } from 'react';
import { Layout, Typography, Tree, theme, Button } from 'antd';
import {
    DesktopOutlined,
    CloudServerOutlined,
    DatabaseOutlined,
    GlobalOutlined,
    PoweroffOutlined
} from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

// Mock Tree Data - Will be replaced by API data
const treeData: DataNode[] = [
    {
        title: 'Datacenter-Istanbul',
        key: 'dc-1',
        icon: <GlobalOutlined />,
        children: [
            {
                title: 'Production-Cluster',
                key: 'cl-1',
                icon: <CloudServerOutlined />,
                children: [
                    { title: 'ESXi-Host-01', key: 'host-1', icon: <DesktopOutlined />, isLeaf: true },
                    { title: 'ESXi-Host-02', key: 'host-2', icon: <DesktopOutlined />, isLeaf: true },
                ],
            },
            {
                title: 'Storage-Cluster',
                key: 'str-1',
                icon: <DatabaseOutlined />,
                children: [
                    { title: 'Datastore-SSD', key: 'ds-1', isLeaf: true },
                    { title: 'Datastore-Archive', key: 'ds-2', isLeaf: true },
                ]
            },
        ],
    },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.1)', textAlign: 'center', color: '#fff', lineHeight: '32px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {collapsed ? 'VM' : 'TR-VIRTUAL MGR'}
                </div>
                <div style={{ padding: '0 10px', color: '#fff' }}>
                    <Tree
                        showIcon
                        defaultExpandAll
                        treeData={treeData}
                        style={{ background: 'transparent', color: '#e0e0e0', fontFamily: 'Inter' }}
                        className="enterprise-tree"
                    />
                </div>
            </Sider>
            <Layout>
                <Header style={{ padding: '0 24px', background: '#161616', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
                    <Title level={4} style={{ margin: 0, color: '#e0e0e0', fontWeight: 400 }}>Dashboard</Title>
                    <Button
                        type="primary"
                        danger
                        icon={<PoweroffOutlined />}
                        shape="circle"
                        title="Emergency Shutdown / Panic Button"
                    />
                </Header>
                <Content style={{ margin: '16px 16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: '#1f1f1f', // Enforce dark background
                            borderRadius: borderRadiusLG,
                            color: '#fff'
                        }}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
