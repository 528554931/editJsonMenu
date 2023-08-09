/*
 * @Date: 2023-07-10 16:04:39
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-21 14:11:01
 * @FilePath: \editJsonMenu\src\component\content\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import React, {  useRef, useState } from 'react';
import { Table, Modal, Popconfirm, Space, Tag } from 'antd';
import { ColumnsType } from "antd/es/table"
import type { routerOptions } from '@/types/router';
import Upfile from '@/component/Upfile';
import { useDispatch, useSelector } from 'react-redux';
import { sotreRootType } from '@/store';
import RouterForm, { ChildRef } from '@/component/RouterForm';

import { useTableOfContents } from './contentLogic';


const App: React.FC = () => {

  const tabledata = useSelector<sotreRootType, routerOptions[]>(state => state.tableDataReducer.tableData)
 const originData = useSelector<sotreRootType, routerOptions[]>(state => state.routerReducer.originRouter)
 const setTableData = useDispatch()
 
 const [isModalOpen, setIsModalOpen] = useState(false)

 const {addRouter,confirm} = useTableOfContents(originData,setTableData,setIsModalOpen)

 const formRef = useRef<ChildRef>(null)

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
    width: '40%',
    ellipsis: true,
  },
  {
    title: 'isMenu',
    dataIndex: 'meta.isMenu',
    ellipsis: true,
    render(_,record){
      return record.meta.isMenu
    }
  },
  {
    title: 'noLink',
    dataIndex: 'meta.noLink',
    ellipsis: true,
    render(_,record){
      return record.meta.noLink
    }
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



const handleCancel = () => {
  setIsModalOpen(false);
};
const handleOk = () => {
  // setIsModalOpen(false);
  formRef.current?.onFinish()
 
}



  return <>
    <Upfile />
    <Table rowKey="path" columns={columns} dataSource={tabledata} />
    <Modal width={900} title="菜单" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <RouterForm  ref={formRef} />
  </Modal>
  </>

};

export default App;