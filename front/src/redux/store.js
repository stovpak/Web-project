import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// reducer
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { sagaWatcher } from './rootSagas';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['likes'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: defaultMiddleware => defaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(sagaWatcher);

export const persistor = persistStore(store);
export default { store, persistor };
