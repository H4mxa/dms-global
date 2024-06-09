import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'src/store/AllReducers';

export const selectAppConfig = createSelector(
  (state: RootState) => state.app,
  app => ({
    loadingApp: app.loadingApp,
    theme: app.theme,
  }),
);
