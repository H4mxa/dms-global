import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {allReducer} from './AllReducers';
import rootSaga from './InitSaga';
import {reduxPersistStorage} from '@helper/storage-handlers';
import {SLICE_NAME} from '@common/constant';

const persistConfig = {
  key: 'root',
  storage: reduxPersistStorage,
  whitelist: [SLICE_NAME.APP],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware);

    if (__DEV__) {
      middlewares.push(createLogger());
    }

    return middlewares;
  },
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
