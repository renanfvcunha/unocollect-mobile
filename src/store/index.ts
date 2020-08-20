import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import tron from '../config/ReactotronConfig';
import { AuthState } from './modules/auth/types';
import { FormsState } from './modules/forms/types';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  forms: FormsState;
}

/**
 * Criando configuração do Redux Persist.
 */
const persistConfig = {
  key: 'unoCollect',
  storage: AsyncStorage,
  whitelist: ['auth', 'forms'],
};

/**
 * Criando configuração do Saga Middleware utilizando
 * Reactotron Saga Monitor para desenvolvimento.
 */
let sagaMiddleware: SagaMiddleware;
if (__DEV__ && tron.createSagaMonitor) {
  const sagaMonitor = tron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
} else {
  sagaMiddleware = createSagaMiddleware();
}

/**
 * Mesclando configurações do Redux Persist com o Root Reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Criando o store principal do Redux utilizando
 * Reactotron para desenvolvimento
 */
let store: Store;
if (__DEV__ && tron.createEnhancer) {
  store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware), tron.createEnhancer()),
  );
} else {
  store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
}

/**
 * Atribuindo variavel para o Persist Store do Redux Persist
 * passando o store principal como parâmetro
 */
const persistor = persistStore(store);

/**
 * Inicializando os Side Effects do Redux Saga
 */
sagaMiddleware.run(rootSaga);

export { store, persistor };
