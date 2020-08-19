import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes';

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <StatusBar style="dark" />
    </>
  );
};

export default App;
