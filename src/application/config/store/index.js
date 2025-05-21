import { configureStore } from '@reduxjs/toolkit';
import reducers from 'application/actions';
import rootSaga from 'infrastructure/services';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableStateInvariant: false,
      thunk: false,
      serializableCheck: {
        ignoredActionPaths: [],
      },
    }).concat(sagaMiddleware),
  reducer: reducers
});

sagaMiddleware.run(rootSaga);