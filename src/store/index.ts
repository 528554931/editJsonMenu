/*
 * @Date: 2023-07-11 11:11:52
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:31:54
 * @FilePath: \editJsonMenu\src\store\index.ts
 * @Description: 
 * @Author: JinXueJun
 */

import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import routerReducer from './routerSlice';
import tableDataReducer from './tableData';
const sotre = configureStore({
  reducer: {
    routerReducer,
    tableDataReducer
  },
  middleware:[logger]
})


export type sotreRootType = ReturnType<typeof sotre.getState>


export default sotre