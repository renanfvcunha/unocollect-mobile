import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { AuthState } from './modules/auth/types';
import { FormsState } from './modules/forms/types';
import { FillsState } from './modules/fills/types';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  forms: FormsState;
  fills: FillsState;
}

/**
 * Criando configuração do Redux Persist.
 */
const persistConfig = {
  key: 'unoCollect',
  storage: AsyncStorage,
  blacklist: ['fills'],
};

/**
 * Criando configuração do Saga Middleware utilizando
 * Reactotron Saga Monitor para desenvolvimento.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Mesclando configurações do Redux Persist com o Root Reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Criando o store principal do Redux utilizando
 * Reactotron para desenvolvimento
 */
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

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
