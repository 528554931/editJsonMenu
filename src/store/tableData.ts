/*
 * @Date: 2023-07-11 14:09:33
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:36:26
 * @FilePath: \editJsonMenu\src\store\tableData.ts
 * @Description: 
 * @Author: JinXueJun
 */


import { createSlice } from "@reduxjs/toolkit";
import { actionTypes, initTanleDataType } from "./actionTypes";


const initTanleData:initTanleDataType = {
  tableData:[]
}



const tableDataSlice = createSlice({
  name :'tableData',
  initialState: initTanleData,
  reducers: {
    updateTable: (state,action:actionTypes) => {
      state.tableData = action.payload
      return state
    }
  }
})

export const {updateTable } = tableDataSlice.actions

export default tableDataSlice.reducer