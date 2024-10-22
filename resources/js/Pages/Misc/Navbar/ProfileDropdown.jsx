// avatar > portfel > przekierowanie na profil > moje zamówienia > ustawienia > wyloguj
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import Layout from '@/Layouts/Layout';
const ProfileDropdown = () => (
    <Layout>
        <Space>

            <Badge dot offset={[-4.5, 2.5]}>
                <Avatar shape="circle" icon={<UserOutlined />} />
            </Badge>
        </Space>
    </Layout>
);
export default ProfileDropdown;