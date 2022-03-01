import type { FormInstance } from 'antd';
import { Button, Form, Input, Modal, Select } from 'antd';
import './style.less';
import type { MutableRefObject } from 'react';
import { useState } from 'react';
// import form from 'antd/lib/form';
import UserForm, { UserFormPropsType } from './UserForm';
import withModal from './withModal';
import React from 'react';
import useFormModal from './useFormModal';
import { addUserEvent } from '@/utils/event/EventHandler';

// export default function TestPage() {
//   const [visiable, setVisiable] = useState(false);
//   const [form] = Form.useForm();
//   // 打开弹窗
//   const open = () => {
//     setVisiable(true);
//   };
//   //关闭弹窗
//   const close = () => {
//     setVisiable(false);
//   };
//   //点击确定提交表单
//   const submit = ()=>{
//     form.submit()
//   }
//   // 提交后获取表单数据，请求接口，重置表单并关闭
//   const onSubmit = (values) =>{
//     console.log(values)
//     //await  fetch ...
//     form.resetFields();
//     close()
//   }
//   return (
//     <div>
//       <div className="text-center">
//         <Button type="primary" onClick={open}>
//           新建
//         </Button>
//       </div>
//       <Modal visible={visiable} title="新建用户"   onCancel={close} onOk={submit}>
//         <div className="form">
//           <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
//             <Form.Item
//               label="用户名"
//               name="username"
//               rules={[{ required: true, message: 'Please input  username!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label="用户邮箱"
//               name="mail"
//               rules={[{ required: true, message: 'Please input mail!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label="部门"
//               name="depart"
//               rules={[{ required: true, message: 'Please input depart!' }]}
//             >
//               <Select>
//                 <Select.Option value={1}>市场部</Select.Option>
//                 <Select.Option value={2}>财务部</Select.Option>
//                 <Select.Option value={3}>研发部</Select.Option>
//               </Select>
//             </Form.Item>
//           </Form>
//         </div>
//       </Modal>
//     </div>
//   );
// }

//-----------------------withModal--------------------------------

// export default function TestPage() {
//   const [visiable, setVisiable] = useState(false);
//   // 打开弹窗
//   const open = () => {
//     setVisiable(true);
//   };
//   //关闭弹窗
//   const close = () => {
//     setVisiable(false);
//   };
//   //点击确定提交表单
//   const submit = (ref: MutableRefObject<FormInstance>) => {
//     ref.current.submit();
//   };
//   const afterSubmit = () => {
//     close();
//   };
//   const UserFormModal = withModal({ title: '新建用户' }, { afterSubmit })(React.forwardRef(UserForm));

//   return (
//     <div>
//       <div className="text-center">
//         <Button type="primary" onClick={open}>
//           新建
//         </Button>
//       </div>
//       <UserFormModal visible={visiable} onCancel={close} onOk={submit} />
//     </div>
//   );
// }
//-----------------------useModal--------------------------------
export default function TestPage(props) {
  return (
    <div>
      <div className="text-center">
        <Button
          type="primary"
          onClick={() => {
            props.history.push('/test/page1');
            addUserEvent.dispatch({ hot: true });
          }}
        >
          打开page1的弹窗
        </Button>
      </div>
    </div>
  );
}
