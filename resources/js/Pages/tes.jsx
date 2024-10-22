import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import Layout from '@/Layouts/Layout';
const App = () => (
    <Layout>
        <Space size={235}>

            <Badge dot offset={[-4.5, 2.5]}>
                <Avatar shape="circle" icon={<UserOutlined />} />
            </Badge>
        </Space>
    </Layout>
);
export default App;