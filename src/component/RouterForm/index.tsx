/*
 * @Date: 2023-07-11 15:07:52
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 15:34:04
 * @FilePath: \editJsonMenu\src\component\RouterForm\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */
import { Button, Checkbox, Form, Input } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';

interface ChildRef {
  onFinishFailed: (errorInfo: any) => void;
}

const App =forwardRef<ChildRef>((_,ref) =>{

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useImperativeHandle(ref, ()=>({
    onFinishFailed
  }))

  return <Form
  name="basic"
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 16 }}
  style={{ maxWidth: 600 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
>
  <Form.Item
    label="Username"
    name="username"
    rules={[{ required: true, message: 'Please input your username!' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: 'Please input your password!' }]}
  >
    <Input.Password />
  </Form.Item>

  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
    <Checkbox>Remember me</Checkbox>
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>
}) 

export default App;