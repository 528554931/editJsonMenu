import { idType, routerOptions } from "@/types/router"
import cloneDeep from "lodash/cloneDeep"

/*
 * @Date: 2023-07-11 14:38:37
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:43:07
 * @FilePath: \editJsonMenu\src\utils\index.ts
 * @Description: 
 * @Author: JinXueJun
 */
type fucToTree<T> = (value: T, parentId: string) => T



export const findSystemId = (router: routerOptions[]): string => {
  const ids = router.map(item => item.id)
  const parents = router.map(item => item.parentId)
  const sysID = parents.find(item => !ids.includes(item))

  return sysID!
}

export const toTree: fucToTree<routerOptions[]> = (routerArray, parentId) => {
  const router = cloneDeep(routerArray)
 
   const parentIdMap = new Map<idType, routerOptions>();
 
   router.forEach((item) => {
     parentIdMap.set(item.id!, item);
   });
 
   const result: routerOptions[] = [];
 
   router.forEach((item) => {
     const parent = parentIdMap.get(item.parentId);
 
     if (parent) {
       if (!Array.isArray(parent.children)) {
         parent.children = [];
       }
 
       parent.children.push(item);
     } else {
       item.parentId = parentId
       result.push(item);
     }
   });
 
   return result.filter((item) => item.parentId === parentId);
 };


