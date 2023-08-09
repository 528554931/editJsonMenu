/*
 * @Date: 2023-07-12 13:45:38
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-21 14:14:18
 * @FilePath: \editJsonMenu\src\component\content\contentLogic.ts
 * @Description: 
 * @Author: JinXueJun
 */

import { sotreRootType } from "@/store";
import { actionTypes } from "@/store/actionTypes";
import { updateOriginRouter } from "@/store/routerSlice";
import { updateTable } from "@/store/tableData";
import { routerOptions } from "@/types/router"
import { findSystemId, toTree } from "@/utils";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { Popconfirm, Space, Tag } from "antd"


export const useTableOfContents = (
  originData:routerOptions[],
  setTableData:Dispatch<actionTypes>,
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
  )=> {
 
    const tabledata = useSelector<sotreRootType, routerOptions[]>(state => state.tableDataReducer.tableData)
  
const confirm = (_: React.MouseEvent<HTMLElement>, record: routerOptions) => {

  const newOriginData = originData.filter(item => item.path !== record.path)

  const SYSTEMID = findSystemId(newOriginData)
  const router = toTree(newOriginData, SYSTEMID)

  setTableData(updateOriginRouter(newOriginData))
  setTableData(updateTable(router))
  originData = newOriginData

};

const addRouter = (record: routerOptions) => {

  setIsModalOpen(true)


}


return {
  addRouter,
  confirm
}
}