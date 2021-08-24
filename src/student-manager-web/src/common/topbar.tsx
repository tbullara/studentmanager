import { Menu } from "antd"
import { Link } from "react-router-dom";

export const Topbar: Function = () => {
    return (<Menu theme="dark" mode="horizontal" style={{marginLeft: 175}}>
        <Menu.Item key="8"><Link to="/home">Home</Link></Menu.Item>
        <Menu.Item key="9"><Link to="/login">Profile</Link></Menu.Item>
        <Menu.Item key="10"><Link to="/about">About</Link></Menu.Item>
    </Menu>);
};