import {createSlice} from '@reduxjs/toolkit';
import {IApp} from './types';
import {SLICE_NAME} from '@common/constant';

const initialState: IApp = {
  theme: 'default',
  loadingApp: false,
  token: null,
};

const slice = createSlice({
  name: SLICE_NAME.APP,
  initialState,
  reducers: {
    processStartLoadApp: state => {
      state.loadingApp = true;
    },
    processSetToken: (state, action) => {
      state.token = action.payload;
      state.loadingApp = false;
    },
    processEndLoadApp: state => {
      state.loadingApp = false;
    },
  },
});

export const {actions: appActions, reducer} = slice;

export default slice.reducer;
