import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers';

const store = configureStore({
  reducer: userReducer,
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store;
