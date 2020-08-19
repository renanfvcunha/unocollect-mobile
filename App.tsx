import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store';
import Auth from './src/Auth';

/* if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron Started!'),
  );
} */

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth />
        <StatusBar style="dark" />
      </PersistGate>
    </Provider>
  );
};

export default App;
