import {createSlice} from '@reduxjs/toolkit';
import {ILogin} from './types';
import {SLICE_NAME} from '@common/constant';

const initialState: ILogin = {
  token: null,
  isFetching: false,
};

const slice = createSlice({
  name: SLICE_NAME.LOGIN,
  initialState,
  reducers: {
    processLoginApp: state => {
      state.isFetching = true;
    },
    processLoginAppSuccess: (state, action) => {
      state.token = action.payload;
      state.isFetching = false;
    },
    ProcessLoginAppFailed: state => {
      state.isFetching = false;
    },

    processSetAppToken: () => {},
    processSetAppTokenSuccess: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {actions: loginActions, reducer} = slice;

export default slice.reducer;
