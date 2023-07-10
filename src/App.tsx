import React from 'react';
import { Layout } from 'antd';
import FileTable from '@/component/content/index';

const {Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  height: '100vh',
  padding: '0 10px',
  color: '#fff',
  // backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#000',
  height: '100vh',
  backgroundColor: '#fff',
};


const App: React.FC = () => (
    <Layout>
      {/* <Sider style={siderStyle}>Sider</Sider> */}
      <Layout>
        <Content style={contentStyle}>
          <FileTable/>
        </Content>
      </Layout>
    </Layout>
);

export default App;