import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './TopNavbar.css';

const { SubMenu } = Menu;

const TopNavbar = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      //   theme="dark"
      mode="horizontal"
      // className="navbarTop"
      style={{
        margin: '0px auto',
        marginBottom: '10px',
        boxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.2)',
        height: '100%',
        transition: '0.3s',
      }}
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <SubMenu
        key="userInfo"
        icon={<UserOutlined />}
        title="UserName"
        style={{ marginLeft: 'auto' }}
      >
        <Menu.Item key="settingProfile">Profile</Menu.Item>
        <Menu.Item key="settingLogout">Logout</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default TopNavbar;
