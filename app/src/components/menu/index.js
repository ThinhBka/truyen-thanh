import React from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  CloudUploadOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import {
  Link,
} from "react-router-dom";


const { SubMenu } = Menu;

export class MenuComponent extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ width: 256, margin: 40, marginLeft: 60 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/user/">Thông tin cá nhân</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<CloudUploadOutlined />}>
            <Link to="/user/upload">Đăng Tải File</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<PhoneOutlined />}>
            <Link to="/user/micro">Microphone</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<ContainerOutlined />} title="Danh sách thiết bị">
            <Menu.Item key="3">
              <Link to="/user/source">Danh sách nguồn phát</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/user/speak">Danh sách loa</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/user/timer">Hẹn Giờ</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/user/logout">Đăng Xuất</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
