/*
 * @Date: 2023-07-10 16:04:39
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:45:14
 * @FilePath: \editJsonMenu\src\component\content\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import React, { useState } from 'react';
import { Space, Table, Tag, Popconfirm, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { routerOptions} from '@/types/router';
import Upfile from '@/component/Upfile';
import { useSelector } from 'react-redux';
import {sotreRootType } from '@/store';
import { findSystemId, toTree } from '@/utils';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateOriginRouter } from '@/store/routerSlice';
import { updateTable } from '@/store/tableData';


interface modelRCType {
  content:  JSX.Element
}


let originData:routerOptions[]

let setTableData: Dispatch<AnyAction>


const confirm = (_: React.MouseEvent<HTMLElement>, record: routerOptions) => {

  const newOriginData = originData.filter(item => item.path !== record.path)
 const SYSTEMID = findSystemId(newOriginData)
  const router = toTree(originData, SYSTEMID)

  setTableData(updateOriginRouter(newOriginData))
  setTableData(updateTable(router))

};

const addRouter = (record: routerOptions) => {
  console.log(record);
  
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



const ModelRC: React.FC<modelRCType> = (props) => {
  const {content} = props
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
    {content}
  </Modal>
}

const RouterForm =() =>{
  return <></>
}

const App: React.FC = () => {
  const tabledata = useSelector<sotreRootType>(state => state.tableDataReducer.tableData) as routerOptions[]
  originData = useSelector<sotreRootType>(state => state.routerReducer.originRouter) as routerOptions[]

  
  return <>
    <Upfile />
    <Table rowKey="path" columns={columns} dataSource={tabledata} />
    <ModelRC content={<RouterForm/>} />
  </>

};

export default App;