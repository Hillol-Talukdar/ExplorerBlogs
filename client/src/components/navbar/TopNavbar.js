import React, { useContext, useReducer, useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutApi } from '../../apis/userAuthApis';
import AuthContext from '../../contexts/userAuth/AuthContext';
import { loginReducer } from '../../reducers/userReducer';
import './TopNavbar.css';

const { SubMenu } = Menu;

const TopNavbar = () => {
  const authContext = useContext(AuthContext);
  const [current, setCurrent] = useState('home');
  const history = useHistory();
  const [state, dispatch] = useReducer(loginReducer);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';
  const { user } = userInfo;

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    logoutApi(authContext)(dispatch);
    history.push('/');
    toast.success('Logged out successfully!');
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
          <Menu.Item key="settingLogout" onClick={logoutHandler}>
            Logout
          </Menu.Item>
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
