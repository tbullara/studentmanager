import React, { Component, FC, useEffect, useState } from 'react';
import './App.css';
import { IHttpClientRequestArgs } from './interfaces/http-client-args';
import { IUser } from './models/user';
import { httpClient } from './services/http-client-service';
import { Table, Spin, Layout, Menu, Breadcrumb, Empty, Button, Badge, Tag, Radio, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Avatar, { AvatarProps } from 'antd/lib/avatar/avatar';
import {
  UserOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { NewStudentForm } from './components/student-drawer-form';
import { errorNotif, successNotif } from './components/notifications';
import { Sidebar } from './common/sidebar';
import { Topbar } from './common/topbar';
import { Login } from './common/login';
import { Dashboard } from './common/dashboard';
import { Analytics } from './components/analytics';

const { Header, Content, Footer } = Layout;

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
  const params: IHttpClientRequestArgs<IUser> = {
    url: `students/${studentId}`,
    requiresToken: false
  }
  httpClient.delete<IUser>(params).then(() => {
    successNotif("Student deleted", `Student #${studentId} deleted successfully.`);
    callback();
  })
}

const columns: Function = (fetchStudents: any) => [
  {
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text: string, student: IUser) => {
        <UserAvatar name={student.profile.name}/> 
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
    render: (text: string, student: IUser) =>
      <Radio.Group>
        <Popconfirm
          placement='topRight'
          title={`Are you sure you want to delete ${student.profile.name}`}
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
  const [students, setStudents] = useState<IUser[]>([]);
  const [render, updateRender] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchStudents = () => {
    const params: IHttpClientRequestArgs<IUser[]> = {
      url: 'students',
      requiresToken: false
    }

    httpClient.get<IUser[]>(params).then((data: IUser[]) => {
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

    if (students === undefined || students.length <= 0) {
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

  const components: any = {
    1: 'poo',
    2: <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>{renderStudents()}</div>,
    3: <Analytics />,
    4: <h1> 4 </h1>,
    5: <h1> 5 </h1>,
    8: <h1> home </h1>,
    9: <Login />,
    10: <h1> about </h1>
  }

  const handleSideBarClick = (menu: any) => {
    updateRender(menu.key)
  }

  return <>
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <Topbar />
      </Header>
      <Layout className="site-layout">
        <Sidebar handleClick={handleSideBarClick} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{overflow: 'initial' }}>
            {components[render]}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Student Manager Web ©2021.1.0</Footer>
        </Layout>
      </Layout>
    </Layout>
  </>
}

export default App;

