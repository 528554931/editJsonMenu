/*
 * @Date: 2023-07-11 15:07:52
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 15:34:04
 * @FilePath: \editJsonMenu\src\component\RouterForm\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */
import { sotreRootType } from '@/store';
import { idType, metaOptions, routerOptions } from '@/types/router';
import { findSystemId, toTree } from '@/utils';
import { TreeSelect, Form, Input } from 'antd';
import { forwardRef, useImperativeHandle, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ChildRef {
  getTreeData: (data: routerOptions[]) => void
}
interface initFormType {
  id?: idType;
  parentId: string;
  path: string;
  name: string;
  redirect: string | null;
  component: string;
  children?: routerOptions[];
  meta?: metaOptions;
}
interface actionType {
  type: string,
}

const initForm: initFormType = {
  id: 0,
  parentId: '',
  path: '',
  name: '',
  redirect: '',
  component: '',

}

const reducer = (state: initFormType, action: actionType) => {
  return state
}

const App = forwardRef<ChildRef>((_, ref) => {

  const [routerForm, Dispatch] = useReducer(reducer, initForm)
  const originData = useSelector<sotreRootType>(state => state.routerReducer.originRouter) as routerOptions[]

  const tree = originData.filter(item => item.meta.isMenu === 'true')

  const SYSTEMID = findSystemId(tree)
  const treeData = toTree(tree, SYSTEMID)

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const getTreeData = (data: routerOptions[]) => {
    // setTreeData(data)
  }

  const onChange = () => { }

  const generateLabel = (data: routerOptions): string => {
    return `${data.meta.title}`
  }

  useImperativeHandle(ref, () => ({
    getTreeData
  }))

  return <Form
    name="basic"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 19 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="上级菜单"
      name="username"
    >
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={routerForm.parentId}
        fieldNames={{
          label: 'meta.title',
          value: 'id',
          children: 'children'
        }}
        dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </Form.Item>
  </Form>
})

export default App;