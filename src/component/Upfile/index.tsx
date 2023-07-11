/*
 * @Date: 2023-07-11 11:04:07
 * @LastEditors: JinXueJun && jinxuejun@wondersgroup.com
 * @LastEditTime: 2023-07-11 14:40:11
 * @FilePath: \editJsonMenu\src\component\Upfile\index.tsx
 * @Description: 
 * @Author: JinXueJun
 */

import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd'
import type { routerOptions} from '@/types/router';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateOriginRouter } from '@/store/routerSlice';
import { updateTable } from '@/store/tableData';
import { findSystemId, toTree } from '@/utils';

let SYSTEMID: string
let setTableData: Dispatch<AnyAction>
const props: UploadProps = {
  showUploadList: false,
  name: 'file',
  accept: '.json',
  beforeUpload(file) {

    const reader = new FileReader()
    reader.onload = (e) => {
    const  originData = JSON.parse(e.target?.result as string) as routerOptions[]
      SYSTEMID = findSystemId(originData)
      setTableData(updateOriginRouter(originData))
      const result = toTree(originData, SYSTEMID)
      setTableData(updateTable(result))

    }
    reader.readAsText(file)

  },
  customRequest() {
    return
  }
}



const Upfile = () => {

  setTableData = useDispatch()

  return <Upload {...props}>
    <Button type="primary" icon={<UploadOutlined />}>点击上传JSON</Button>
  </Upload>
}

export default Upfile