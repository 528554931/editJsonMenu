/*
 * @Date: 2023-07-10 16:04:39
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-10 17:25:40
 * @FilePath: \editJsonMenu\src\component\content\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import React, { useState } from 'react';
import { Space, Table, Button, Upload, Tag, Popconfirm, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';
import cloneDeep from 'lodash/cloneDeep'
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

let setTableData: React.Dispatch<React.SetStateAction<routerOptions[]>>

type fucToTree = (router: routerOptions[], parentId: string) => routerOptions[]


let originData: routerOptions[]
let SYSTEMID: string

const toTree: fucToTree = (router, parentId) => {
  router = cloneDeep(router)

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
      item.parentId = parentId
      result.push(item);
    }
  });

  return result.filter((item) => item.parentId === parentId);
};

const confirm = (_: React.MouseEvent<HTMLElement>, record: routerOptions) => {

  originData = originData.filter(item => item.path !== record.path)

  const router = toTree(originData, SYSTEMID)

  setTableData(router)

};

const addRouter = (record: routerOptions) => {

}

const columns: ColumnsType<routerOptions> = [
  {
    title: 'title',
    dataIndex: 'meta.title',
    render(_, record) {
      return record.meta.title
    },
  },
  {
    title: '类型',
    dataIndex: 'meta.isMenu',
    render(_, record) {
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
        {record.meta.isMenu === 'true' && <a onClick={() => addRouter(record)} >新增</a>}
        <a>编辑</a>
        <Popconfirm
          title="确定要删除吗？"
          onConfirm={(e) => confirm(e!, record)}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>

      </Space>
    ),
  },
];

const findParent = (router: routerOptions[]): string => {
  const ids = router.map(item => item.id)
  const parents = router.map(item => item.parentId)
  const sysID = parents.find(item => !ids.includes(item))

  return sysID!
}

const data: routerOptions[] = [];

const props: UploadProps = {
  showUploadList: false,
  name: 'file',
  accept: '.json',
  beforeUpload(file) {

    const reader = new FileReader()
    reader.onload = (e) => {
      originData = JSON.parse(e.target?.result as string) as routerOptions[]
      SYSTEMID = findParent(originData)

      const result = toTree(originData, SYSTEMID)
      setTableData(result)

    }
    reader.readAsText(file)

  },
  customRequest() {
    return
  }
}

const Upfile = () => {
  return <Upload {...props}>
    <Button type="primary" icon={<UploadOutlined />}>点击上传JSON</Button>
  </Upload>
}

type ModelRCType = {
}
const ModelRC = (props: ModelRCType) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

  </Modal>
}

const App: React.FC = () => {
  const [tableData, setData] = useState(data)
  setTableData = setData

  return <>
    <Upfile />
    <Table rowKey="path" columns={columns} dataSource={tableData} />
  </>

};

export default App;