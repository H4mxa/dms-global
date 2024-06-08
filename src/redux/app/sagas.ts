import {put, takeEvery} from 'redux-saga/effects';
import {appActions} from '.';
import {loadString} from '@helper/storage-handlers';
import {MMKV_KEY} from '@common/constant';

function* watchAppProcess(): any {
  try {
    const token = loadString(MMKV_KEY.APP_TOKEN);
    if (typeof token === 'string') {
      yield put(appActions.processSetToken(token));
    } else {
      yield put(appActions.processEndLoadApp());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield takeEvery(appActions.processStartLoadApp.type, watchAppProcess);
}
