/*
 * @Date: 2023-07-11 11:12:06
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:36:14
 * @FilePath: \editJsonMenu\src\store\routerSlice.ts
 * @Description:
 * @Author: JinXueJun
 */

import { createSlice } from "@reduxjs/toolkit";
import { actionTypes, initRouterSlice } from "./actionTypes";


const initRouter: initRouterSlice = {
  originRouter: [],
};

const routerReducer = createSlice({
  name: "router",
  initialState: initRouter,
  reducers: {
    updateOriginRouter: (state,action:actionTypes)=>{
      state.originRouter = action.payload
      return state
    }
  },
});

export const {updateOriginRouter} =  routerReducer.actions

export default routerReducer.reducer