/*
 * @Date: 2023-07-10 16:04:39
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-10 17:25:40
 * @FilePath: \editJsonMenu\src\component\content\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import React, { useState } from 'react';
import { Space, Table,  Button, message, Upload, Tag  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';

interface metaOptions {
  title: string;
  icon: string | null;
  isMenu: string;
  noLink: string | null;
}

type idType = string | number;

interface routerOptions {
  id?: idType;
  parentId: string;
  path: string;
  name: string;
  redirect: string | null;
  component: string;
  children?: routerOptions[];
  meta: metaOptions;
}

let setTableData : React.Dispatch<React.SetStateAction<routerOptions[]>>

type fucToTree = (router: routerOptions[], parentId: string) => routerOptions[]

// const SYSTEMID = "05395ecdee02408d9ef1114185b736d4" // 系统id

const toTree:fucToTree = (router, parentId) => {
  const parentIdMap = new Map<idType, routerOptions>();

  router.forEach((item) => {
    parentIdMap.set(item.id!, item);
  });

  const result: routerOptions[] = [];

  router.forEach((item) => {
    const parent = parentIdMap.get(item.parentId);

    if (parent) {
      if (!Array.isArray(parent.children)) {
        parent.children = [];
      }

      parent.children.push(item);
    } else {
      result.push(item);
    }
  });

  return result.filter((item) => item.parentId === parentId);
};

const columns: ColumnsType<routerOptions> = [
  {
    title: 'title',
    dataIndex: 'meta.title',
    render(_, record) {
        return record.meta.title
    },
  },
  {
    title: '是否菜单',
    dataIndex: 'meta.isMenu',
    render(_,record) {
      return record.meta.isMenu === 'true' ? <Tag color="success">菜单页面</Tag> : <Tag color="error">子路由</Tag>
    }
  },
  {
    title: 'Path',
    dataIndex: 'path',
    width: '50%',
    ellipsis: true,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>新增</a>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data: routerOptions[] = [];

const props: UploadProps = {
  showUploadList:false,
  name: 'file',
  accept: '.json',
  beforeUpload(file) {
    
    const reader = new FileReader()
    reader.onload =(e) => {
      const router:routerOptions[] = JSON.parse(e.target?.result as string) as routerOptions[]

    const result =  toTree(router,router[0].parentId)
      setTableData(result)
      
    }
    reader.readAsText(file)
    
  },
  customRequest() {
    return
  }
}

const Upfile = ()=> {
  return <Upload {...props}>
  <Button icon={<UploadOutlined />}>点击上传JSON</Button>
</Upload>
}

const App: React.FC = () => {
  const [tableData,setData] = useState(data)
  setTableData = setData
  return <>
  <Upfile/>
  <Table rowKey="path" columns={columns} dataSource={tableData} />
  </>
   
};

export default App;