/*
 * @Date: 2023-07-12 13:45:38
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-12 13:58:52
 * @FilePath: \editJsonMenu\src\component\content\contentLogic.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import { actionTypes } from "@/store/actionTypes";
import { updateOriginRouter } from "@/store/routerSlice";
import { updateTable } from "@/store/tableData";
import { routerOptions } from "@/types/router"
import { findSystemId, toTree } from "@/utils";
import { Dispatch } from "@reduxjs/toolkit";
// import { Popconfirm, Space, Tag } from "antd"


export const useTableOfContents = (
  originData:routerOptions[],
  setTableData:Dispatch<actionTypes>,
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
  )=> {
 

  
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