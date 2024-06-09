import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'src/store/AllReducers';

export const selectIsFetching = createSelector(
  (state: RootState) => state.login,
  login => login.isFetching,
);
export const selectAppToken = createSelector(
  (state: RootState) => state.login,
  login => login.token,
);
