import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const tron = Reactotron.configure()
  .configure({ host: process.env.REACTOTRON_URL })
  .use(reactotronRedux())
  .use(sagaPlugin({ except: [''] }));

if (__DEV__) {
  tron.connect();
}

if (tron.clear) {
  tron.clear();
}

export default tron;
