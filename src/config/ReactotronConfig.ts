import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

let tron: typeof Reactotron;
if (Reactotron.setAsyncStorageHandler) {
  tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: '192.168.15.83' })
    .use(reactotronRedux())
    .use(sagaPlugin({ except: [''] }))
    .useReactNative()
    .connect();

  if (tron.clear) {
    tron.clear();
  }
} else {
  tron = Reactotron.configure({ host: '192.168.15.83' })
    .use(reactotronRedux())
    .use(sagaPlugin({ except: [''] }))
    .useReactNative()
    .connect();

  if (tron.clear) {
    tron.clear();
  }
}

export default tron;
