import { Form, Input, Button, Checkbox, Layout, Menu } from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  StockOutlined
} from '@ant-design/icons';
import { Sidebar } from './sidebar';
import { Content, Footer } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';


export const Register: () => JSX.Element = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="site-layout">
      <Layout style={{ padding: '0 24px 24px', alignItems: 'center'}}>
        <Title> Create an Account <StockOutlined /> </Title>
        <Content style={{ marginTop: '5vh' }}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name' }]}
            >
              <Input placeholder="Johny Selfish" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input placeholder="jself@likemselfish.gov" />
            </Form.Item>
            <Form.Item
              name="organization"
              rules={[{ required: true, message: 'Please input your organization' }]}
            >
              <Input placeholder="Johny Selfish Inc."/>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input placeholder="Username"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Create Account
              </Button>
            </Form.Item>
            <span>
                <Link to="/login">
                  Back To Login
                </Link>
            </span>
          </Form>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Student Manager Web ©2021.1.0</Footer>
      </Layout>
    </Layout>
  );
};