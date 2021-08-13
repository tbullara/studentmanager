import React, { Component, FC, useEffect, useState } from 'react';
import './App.css';
import { IHttpClientRequestArgs } from './interfaces/http-client-args';
import { IStudent } from './interfaces/student';
import { httpClient } from './services/http-client-service';
import { Table, Spin, Layout, Menu, Breadcrumb, Empty, Button, Badge, Tag, Radio, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Avatar, { AvatarProps } from 'antd/lib/avatar/avatar';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { NewStudentForm } from './components/student-drawer-form';
import { errorNotif, successNotif } from './components/notifications';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const UserAvatar: Function = ({name}: FC<string>) => {
  let trim = name.trim();
  if (trim.length === 0) {
      return <Avatar icon={<UserOutlined/>}/>
  }
  const split = trim.split(" ");
  if (split.length === 1) {
      return <Avatar>{name.charAt(0)}</Avatar>
  }
  return <Avatar>
      {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
  </Avatar>
}

const deleteStudent: Function = (studentId: number, callback: Function) => {
  const params: IHttpClientRequestArgs<IStudent> = {
    url: `students/${studentId}`,
    requiresToken: false
  }
  httpClient.delete<IStudent>(params).then(() => {
    successNotif("Student deleted", `Student #${studentId} deleted successfully.`);
    callback();
  })
}

const columns: Function = (fetchStudents: any) => [
  {
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text: string, student: IStudent) => {
        <UserAvatar name={student.name}/> 
    }
  },
  {
    title: 'StudentId',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
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
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (text: string, student: IStudent) =>
      <Radio.Group>
        <Popconfirm
          placement='topRight'
          title={`Are you sure you want to delete ${student.name}`}
          onConfirm={() => deleteStudent(student.id, fetchStudents)}
          okText='Yes'
          cancelText='No'
        >
          <Radio.Button value='small'>Delete</Radio.Button>
        </Popconfirm>
        <Radio.Button value='small'>Edit</Radio.Button>
      </Radio.Group>
  }
];

const loader = <LoadingOutlined type="loading" style={{ fontSize: 24 }} />;

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchStudents = () => {
    const params: IHttpClientRequestArgs<IStudent[]> = {
      url: 'students',
      requiresToken: false
    }

    httpClient.get<IStudent[]>(params).then((data: IStudent[]) => {
      setStudents(data);
    }).catch(err => {
        errorNotif(err.message, "sumn fucked up");
    }).finally(() => setFetching(false));
  }

  useEffect(() => {
    fetchStudents();
  }, []);
  
  const renderStudents = () => {
    if (fetching) {
      return <Spin indicator={loader}/>
    }

    if (students.length <= 0) {
      return <>
          <Button
              onClick={() => setShowDrawer(!showDrawer)}
              type="primary" shape="round" icon={<PlusCircleOutlined/>} size="small">
              Add New Student
          </Button>
          <NewStudentForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchStudents={fetchStudents}
          />
        <Empty/>
      </>
    }
    
    return <>
      <NewStudentForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchStudents={fetchStudents}
      />
      <Table
          dataSource={students}
          columns={columns(fetchStudents)}
          bordered
          title={() =>
              <>
                  <Tag>Number of students</Tag>
                  <Badge count={students.length} className="site-badge-count-4"/>
                  <br/><br/>
                  <Button
                      onClick={() => setShowDrawer(!showDrawer)}
                      type="primary" shape="round" icon={<PlusCircleOutlined/>} size="small">
                      Add New Student
                  </Button>
              </>
          }
          pagination={{pageSize: 50}}
          scroll={{y: 500}}
          rowKey={student => student.id}
      />
    </>
  }
  return <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(setCollapsed)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Admin
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Analytics
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tucker</Menu.Item>
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
            {renderStudents()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Student Manager Web ©2021.1.0</Footer>
      </Layout>
    </Layout>
  </>
}

export default App;
function successNotification(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

