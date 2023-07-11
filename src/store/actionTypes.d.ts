/*
 * @Date: 2023-07-11 14:13:36
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:15:38
 * @FilePath: \editJsonMenu\src\store\actionTypes.d.ts
 * @Description: 
 * @Author: JinXueJun
 */
import { routerOptions } from "@/types/router";

export interface initRouterSlice {
  originRouter: routerOptions[];
}

export interface  initTanleDataType {
  tableData: routerOptions[]
}

export interface actionTypes {
  type: string;
  payload: routerOptions[]
}