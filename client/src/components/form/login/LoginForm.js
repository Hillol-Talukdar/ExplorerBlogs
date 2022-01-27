import React, { useContext, useReducer, useState } from 'react';
import { Form, Input, Button } from 'antd';
import './LoginForm.css';
import { loginReducer } from '../../../reducers/userReducer';
import { loginApi } from '../../../apis/userAuthApis';
import AuthContext from '../../../contexts/userAuth/AuthContext';

const initialState = {
  post: {},
};

const LoginForm = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const authcontext = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, userInfo } = state;

  const contextValue = {
    userInfo: userInfo,
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const onFinish = (values) => {
    loginApi(authcontext, values.userName, values.password)(dispatch);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('login Failed:', errorInfo);
  };

  return (
    <div className="container">
      <h4 className="text-center">Login</h4>

      <div className="mt-5">
        <Form
          className="m-5"
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onSubmit={submitHandler}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username/email"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              id="loginFormSubmitButton"
              //   type="primary"
              className="d-grid gap-2 col-6 mx-auto"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
