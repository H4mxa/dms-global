import {combineReducers} from '@reduxjs/toolkit';
import app from '@redux/app';
import login from '@redux/login';
import tweets from '@redux/tweets';

export const allReducer = combineReducers({
  app,
  login,
  tweets,
});

export type RootState = ReturnType<typeof allReducer>;
