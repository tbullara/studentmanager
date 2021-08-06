import React, { Component } from 'react';
import './App.css';
import { IHttpClientRequestArgs } from './interfaces/http-client-args';
import { IStudent } from './interfaces/student';
import { httpClient } from './services/http-client-service';
import { Table, Spin, Layout, Menu, Breadcrumb, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class App extends Component {
  students!: IStudent[];

  state = {
    isFetching: false,
    collapsed: false,
    students: []
  }

  columns = [
    {
      title: '',
      key: 'avatar',
      render: (text: any, student: IStudent) => (
        <Avatar size="large">
          {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
        </Avatar>
      )
    },
    {
      title: 'StudentId',
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    }
  ];

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  getLoadingIcon(): JSX.Element {
    return <LoadingOutlined type="loading" style={{ fontSize: 24 }} />;
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents(): void {
    const params: IHttpClientRequestArgs<IStudent[]> = {
      url: 'students',
      requiresToken: false
    }

    this.setState({isFetching: true});

    httpClient.get<IStudent[]>(params).then((students: IStudent[]) => {
      this.students = students;
      this.setState({        
        students,
        isFetching: false
      });
    });
  }

  public render() {
    const { isFetching, collapsed } = this.state;

    if (isFetching) {
      return (
        <Spin indicator={ this.getLoadingIcon() } />
      )
    }

    if (this.students && this.students.length <= 0) {
      return <Empty/>
    }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(this.onCollapse)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Table 
                dataSource={this.students} 
                columns={this.columns} 
                bordered 
                title={() => 'Students'}
                pagination={{ pageSize: 50 }}
                rowKey='studentId'/>     
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Student Manager Web ©2021.1.0</Footer>
        </Layout>
      </Layout>
  }
}

export default App;
