import React from 'react';
import { Form, Input, Button } from 'antd';
import './LoginForm.css';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username/email"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
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
            <Input.Password />
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
