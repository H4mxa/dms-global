import {createSlice} from '@reduxjs/toolkit';
import {IApp} from './types';
import {SLICE_NAME} from '@common/constant';

const initialState: IApp = {
  theme: 'default',
  loadingApp: false,
};

const slice = createSlice({
  name: SLICE_NAME.APP,
  initialState,
  reducers: {
    processStartLoadApp: state => {
      state.loadingApp = true;
    },
    processEndLoadApp: state => {
      state.loadingApp = false;
    },
  },
});

export const {actions: appActions, reducer} = slice;

export default slice.reducer;
