import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './src/pages/Home';

const App: React.FC = () => {
  return (
    <>
      <Home />
      <StatusBar style="dark" />
    </>
  );
};

export default App;
