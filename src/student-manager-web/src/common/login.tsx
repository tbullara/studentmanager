import { Form, Input, Button, Checkbox, Layout, Menu } from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Sidebar } from './sidebar';
import { Content, Footer } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';


export const Login: () => JSX.Element = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="site-layout">
      <Layout style={{ padding: '0 24px 24px', alignItems: 'center'}}>
        <Title> TrackIt <BarChartOutlined /> </Title>
        <Content style={{ marginTop: '5vh' }}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{fontSize: '16px'}}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="password"/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Log in
              </Button>
            </Form.Item>
            <span>
                Or Login With
                <GithubOutlined style={{fontSize: '130%', marginLeft: '0.3em'}}/>
                <GoogleOutlined style={{fontSize: '130%', marginLeft: '0.3em'}}/>
                <FacebookOutlined style={{fontSize: '130%', marginLeft: '0.3em'}}/>
                <span className="icon icon-weibo" />
                <Link style={{ float: 'right', marginLeft: '0.3em' }} to="/register">
                  Register
                </Link>
            </span>
          </Form>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Student Manager Web ©2021.1.0</Footer>
      </Layout>
    </Layout>
  );
};