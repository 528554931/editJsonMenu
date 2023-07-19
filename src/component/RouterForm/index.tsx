/*
 * @Date: 2023-07-11 15:07:52
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-19 17:33:18
 * @FilePath: \editJsonMenu\src\component\RouterForm\index.tsx
 * @Description:
 * @Author: JinXueJun
 */
import { sotreRootType } from "@/store";
import { idType, metaOptions, routerOptions } from "@/types/router";
import { findSystemId, toTree } from "@/utils";
import { TreeSelect, Form, Radio, Input, InputNumber, Select } from "antd";
import type { FormItemProps } from "antd";
import { cloneDeep } from "lodash";
import React, { ReactNode } from "react";
import { forwardRef, useImperativeHandle, useReducer } from "react";
import { useSelector } from "react-redux";
import * as icons from '@ant-design/icons';

export interface ChildRef {
  onFinish: (data?: routerOptions[]) => void;
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
  payload: string;
  dataIndex: string;
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

const initForm: initFormType = {
  id: 0,
  parentId: "",
  path: "",
  name: "",
  redirect: "",
  component: "",
};

const camelToKebab=(str:string) =>{
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const allIcons: Record<string, unknown> = icons;

const iconLabel = Object.keys(allIcons).filter(item => item.endsWith('Outlined'))
const iconValue = iconLabel.map(item =>camelToKebab(item).replace('-outlined', '')) 

const iconSelectData = []

iconValue.forEach((item,index) => {
  iconSelectData.push({
    value: item,
    label: allIcons[iconLabel[index]]
  })
})

console.log(iconSelectData);


const reducer = (state: initFormType, action: actionType) => {
  state = cloneDeep(state);
  if (action.dataIndex === "parentId") state.parentId = action.payload;
  if (action.dataIndex === "component") state.component = action.payload;
  if (action.dataIndex === "name") state.name = action.payload;
  return state;
};
function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const customDropdown = (menu) => {
  console.log(menu);
  
  return <span>{}</span>
  
};

const App = forwardRef<ChildRef>((_, ref) => {
  const [routerForm, formDispatch] = useReducer(reducer, initForm);
  const originData = useSelector<sotreRootType>(
    (state) => state.routerReducer.originRouter
  ) as routerOptions[];

  const [form] = Form.useForm()


  const tree = originData.filter(
    (item) => item.meta.noLink === "true" && item.meta.isMenu === "true"
  ).map(item => {
    return {
      ...item,
      title:item.meta.title
      
    }
  });


  const SYSTEMID = findSystemId(tree);
  const treeDataorigin = toTree(tree, SYSTEMID);

  const treeData = [
    {
      id: SYSTEMID,
      title: "根系统",
      children: treeDataorigin,
    },
  ];

  const onFinish = () => {
 const value = form.getFieldsValue()

 console.log(value);
 
 
  
  
    
    
  };

  useImperativeHandle(ref, () => ({
    onFinish,
  }));

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      form={form}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item name="parentId" label="上级菜单">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            fieldNames={{
              label: "title",
              value: "id",
              children: "children",
            }}
            dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeData={treeData}
          />
        </Form.Item>

      <MyFormItemGroup prefix={["meta"]}>
      <MyFormItem name="icon" label="icon">
      <Select
     
      style={{ width: 120 }}
      options={iconSelectData}
    />
        </MyFormItem>
        <MyFormItem name="isMenu" label="isMenu">
          <Radio.Group
            options={[
              { label: "true", value: "true" },
              { label: "fasle", value: "false" },
            ]}
          />
        </MyFormItem>
        <MyFormItem name="noLink" label="noLink">
          <Radio.Group
            options={[
              { label: "true", value: "true" },
              { label: "fasle", value: "false" },
            ]}
          />
        </MyFormItem>
      </MyFormItemGroup>

      <Form.Item label="菜单名称" name="title">
      <Input placeholder="请输入菜单名称" />
      </Form.Item>
      <Form.Item label="显示排序" name="sortNum">
      <InputNumber min={1} max={30} defaultValue={1} />
      </Form.Item>
      <Form.Item label="路由地址" name="path">
      <Input placeholder="请输入菜单名称" />
      </Form.Item>
      <Form.Item label="组件路径" name="component">
      <Input placeholder="请输入菜单名称" />
      </Form.Item>
    </Form>
  );
});

export default App;
