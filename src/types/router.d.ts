/*
 * @Date: 2023-07-11 11:07:18
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 11:07:46
 * @FilePath: \editJsonMenu\src\types\router.d.ts
 * @Description: 
 * @Author: JinXueJun
 */

export interface metaOptions {
  title: string;
  icon: string | null;
  isMenu: string;
  noLink: string | null;
}

export type idType = string | number;

export interface routerOptions {
  id?: idType;
  parentId: string;
  path: string;
  name: string;
  redirect: string | null;
  component: string;
  children?: routerOptions[];
  meta: metaOptions;
}