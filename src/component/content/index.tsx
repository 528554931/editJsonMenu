/*
 * @Date: 2023-07-10 16:04:39
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 15:35:49
 * @FilePath: \editJsonMenu\src\component\content\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Space, Table, Tag, Popconfirm, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { routerOptions } from '@/types/router';
import Upfile from '@/component/Upfile';
import { useDispatch, useSelector } from 'react-redux';
import { sotreRootType } from '@/store';
import { findSystemId, toTree } from '@/utils';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateOriginRouter } from '@/store/routerSlice';
import { updateTable } from '@/store/tableData';
import RouterForm, { ChildRef } from '@/component/RouterForm';
import { actionTypes } from '@/store/actionTypes';


interface modelRCType {
  content: JSX.Element,
  ok: () => void
}


let originData: routerOptions[]

let setTableData: Dispatch<actionTypes>

let ModalOpen: React.Dispatch<React.SetStateAction<boolean>>

let eForm: React.RefObject<ChildRef>


const confirm = (_: React.MouseEvent<HTMLElement>, record: routerOptions) => {

  const newOriginData = originData.filter(item => item.path !== record.path)

  const SYSTEMID = findSystemId(newOriginData)
  const router = toTree(newOriginData, SYSTEMID)

  setTableData(updateOriginRouter(newOriginData))
  setTableData(updateTable(router))
  originData = newOriginData

};

const addRouter = (record: routerOptions) => {

  ModalOpen(true)


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
  const { content, ok } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  ModalOpen = setIsModalOpen

  const handleCancel = () => {
    ModalOpen(false);
  };
  const handleOk = () => {
    ok()
  }

  return <Modal width={900} title="菜单" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    {content}
  </Modal>
}


const App: React.FC = () => {

  const tabledata = useSelector<sotreRootType>(state => state.tableDataReducer.tableData) as routerOptions[]
  originData = useSelector<sotreRootType>(state => state.routerReducer.originRouter) as routerOptions[]
  setTableData = useDispatch()

  eForm = useRef<ChildRef>(null)
  const ok = useCallback(() => {
    return new Promise((res, rej) => {

    })
  }, [])


  console.log('render');

  return <>
    <Upfile />
    <Table rowKey="path" columns={columns} dataSource={tabledata} />
    <ModelRC content={<RouterForm ref={eForm} />} ok={ok} />
  </>

};

export default App;