import {put, takeEvery} from 'redux-saga/effects';
import {appActions} from '.';
import {loginActions} from '@redux/login';

function* watchAppProcess(): any {
  try {
    yield put(loginActions.processSetAppToken());
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield takeEvery(appActions.processStartLoadApp.type, watchAppProcess);
}
