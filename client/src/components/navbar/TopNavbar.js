import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './TopNavbar.css';

const { SubMenu } = Menu;

const TopNavbar = () => {
  const [current, setCurrent] = useState('home');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';
  const { user } = userInfo;

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      // theme="dark"
      mode="horizontal"
      id="navbarTop"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      {userInfo ? (
        <SubMenu
          key="userInfo"
          icon={<UserOutlined />}
          title={user.userName}
          style={{ marginLeft: 'auto' }}
        >
          <Menu.Item key="settingProfile">Profile</Menu.Item>
          <Menu.Item key="settingLogout">Logout</Menu.Item>
        </SubMenu>
      ) : (
        <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
          <Link to="/login">Log in</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default TopNavbar;
