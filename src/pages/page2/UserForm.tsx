import { Form, Input, message, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';
interface UserFormPropsType {
  depart?: number;
  beforeSubmit?: (values: any) => void;
  afterSubmit?: (values: any, form: FormInstance<any>) => void;
}
const UserForm = (props: React.PropsWithChildren<UserFormPropsType>, ref?: React.ForwardedRef<FormInstance>) => {
  const [form] = Form.useForm();
  console.log(111,props)
  const onSubmit = async (values: any) => {
    props.beforeSubmit?.(values);
    // 模拟请求
    await new Promise((r) => {
      setTimeout(r, 3000);
    });
    props.afterSubmit?.(values, form);
    message.success('操作完成~')
    form.resetFields();
  };
  return (
    <div className="form">
      <Form
        onFinish={onSubmit}
        ref={ref}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="用户名"
          name="uname"
          rules={[{ required: true, message: 'Please input  username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户邮箱"
          name="mail"
          rules={[{ required: true, message: 'Please input mail!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="部门"
          name="depart"
          rules={[{ required: true, message: 'Please input depart!' }]}
          initialValue={props.depart}
        >
          <Select>
            <Select.Option value={1}>市场部</Select.Option>
            <Select.Option value={2}>财务部</Select.Option>
            <Select.Option value={3}>研发部</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserForm;
