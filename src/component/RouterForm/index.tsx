/*
 * @Date: 2023-07-11 15:07:52
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-12 15:54:10
 * @FilePath: \editJsonMenu\src\component\RouterForm\index.tsx
 * @Description:
 * @Author: JinXueJun
 */
import { sotreRootType } from "@/store";
import { idType, metaOptions, routerOptions } from "@/types/router";
import { findSystemId, toTree } from "@/utils";
import { TreeSelect, Form, Radio } from "antd";
import { cloneDeep } from "lodash";
import { forwardRef, useImperativeHandle, useReducer } from "react";
import { useSelector } from "react-redux";

export interface ChildRef {
  getTreeData: (data: routerOptions[]) => void;
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

const initForm: initFormType = {
  id: 0,
  parentId: "",
  path: "",
  name: "",
  redirect: "",
  component: "",
};

const reducer = (state: initFormType, action: actionType) => {
  state = cloneDeep(state);
  if (action.dataIndex === "parentId") state.parentId = action.payload;
  if (action.dataIndex === "component") state.component = action.payload;
  if (action.dataIndex === "name") state.name = action.payload;
  return state;
};

const App = forwardRef<ChildRef>((_, ref) => {
  const [routerForm, formDispatch] = useReducer(reducer, initForm);
  const originData = useSelector<sotreRootType>(
    (state) => state.routerReducer.originRouter
  ) as routerOptions[];

  const tree = originData
    .filter(
      (item) => item.meta.noLink === "true" && item.meta.isMenu === "true"
    )
    .map((item) => {
      return {
        ...item,
        title: item.meta.title,
      };
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

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const getTreeData = (data: routerOptions[]) => {
    // setTreeData(data)
  };

  useImperativeHandle(ref, () => ({
    getTreeData,
  }));

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="上级菜单" name="username">
        <TreeSelect
          showSearch
          style={{ width: "100%" }}
          value={routerForm.parentId}
          fieldNames={{
            label: "title",
            value: "id",
            children: "children",
          }}
          dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          onChange={(value) => {
            formDispatch({
              payload: value,
              dataIndex: "parentId",
            });
          }}
          treeData={treeData}
        />
      </Form.Item>
      <Form.Item label="菜单类型" name="username">
        <Radio.Group
          options={[
            { label: "空菜单", value: "isMenu-noLink" },
            { label: "页面菜单", value: "isMenu" },
            { label: "子路由", value: "!" },
          ]}
          onChange={(value)=>{
            formDispatch({
              dataIndex:'meta',
              payload: value.target.value as string,
            })
          }}
          value={routerForm.meta?.isMenu}
        />
      </Form.Item>
    </Form>
  );
});

export default App;
