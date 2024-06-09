import {combineReducers} from '@reduxjs/toolkit';
import app from '@redux/app';
import login from '@redux/login';

export const allReducer = combineReducers({
  app,
  login,
});

export type RootState = ReturnType<typeof allReducer>;
