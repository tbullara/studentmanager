import { Layout, Menu } from "antd"
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useState } from "react";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: Function = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const { handleClick } = props;

    return (<Sider width={200} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={(setCollapsed)}>
        <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            >
            <SubMenu key="sub1" icon={<DesktopOutlined />} title="Admin">
                <Menu.Item key="1" onClick={handleClick}>Classes</Menu.Item>
                <Menu.Item key="2" onClick={handleClick}>Students</Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={<PieChartOutlined />} onClick={handleClick}>
                Analytics
            </Menu.Item>
            <SubMenu key="sub2" icon={<UserOutlined />} title="User">
                <Menu.Item key="4" onClick={handleClick}>Tucker</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="5" onClick={handleClick}>Team 1</Menu.Item>
                <Menu.Item key="6" onClick={handleClick}>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="7" icon={<FileOutlined />} onClick={handleClick}>
                Files
            </Menu.Item>
        </Menu>
    </Sider>)
}