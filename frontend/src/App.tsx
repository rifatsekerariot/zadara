import React from 'react';
import { ConfigProvider } from 'antd';
import MainLayout from './layout/MainLayout';
import { darkTheme } from './theme/darkTheme';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={darkTheme}>
      <MainLayout>
        <h1>System Overview</h1>
        <p>System Status: <span style={{ color: '#24a148' }}>ONLINE</span></p>
        <p>Waiting for host metrics...</p>
      </MainLayout>
    </ConfigProvider>
  );
};

export default App;
