import {combineReducers} from '@reduxjs/toolkit';
import app from '@redux/app';

export const allReducer = combineReducers({
  app,
});

export type RootState = ReturnType<typeof allReducer>;
