import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ExtendedDrawerProps } from "../interfaces/extended-drawer-props";
import { IHttpClientRequestArgs } from "../interfaces/http-client-args";
import { IStudent } from "../interfaces/student";
import { httpClient } from "../services/http-client-service";
import { errorNotif, successNotif } from "./notifications";

const { Option } = Select;
const loadIcon = <LoadingOutlined style={{fontSize: 24}} spin />

export const NewStudentForm: Function = ({showDrawer, setShowDrawer, fetchStudents}: ExtendedDrawerProps): JSX.Element => {
    const onClose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    
    const onFinish = (student: IStudent) => {
        setSubmitting(true);
        const params: IHttpClientRequestArgs<IStudent> = {
            url: 'students',
            requiresToken: false,
            payload: student
          }
      
          httpClient.post<IStudent>(params).then(() => {
            onClose();
            successNotif('Submission Success', `Successfully submitted student: ${student.name}`);
            fetchStudents();
          }).catch(err => {
              // type?
              errorNotif('Submission Error', `There was an error submitting student: ${err}`);
          }).finally(() => setSubmitting(false));
    };

    const onFailed = (errorInfo: any) => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
                title="Create new student"
                width={720}
                onClose={onClose}
                visible={showDrawer}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{marginRight: 8}}>
                            Cancel
                        </Button>
                    </div>
                }
            >
        <Form layout="vertical"
              onFinishFailed={onFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter an email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={loadIcon}/>}
            </Row>
        </Form>
    </Drawer>
};
