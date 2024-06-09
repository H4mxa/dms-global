import {delay, put, takeEvery} from 'redux-saga/effects';
import {loginActions} from '.';
import {loadString, removeAll, saveString} from '@helper/storage-handlers';
import {MMKV_KEY} from '@common/constant';
import {BEARER_TOKEN} from '@config';
import {FormLoginType} from '@model/authentication';
import {appActions} from '@redux/app';
import {showSnack} from '@components/snack-bar';

function* watchLoginProcess(_action: {payload: FormLoginType}) {
  try {
    const token = BEARER_TOKEN;

    yield delay(2000);

    if (token && typeof token === 'string') {
      saveString(MMKV_KEY.APP_TOKEN, token);

      showSnack({
        msg: 'Login Successfully',
        type: 'success',
      });
      yield put(loginActions.processLoginAppSuccess(token));
    } else {
      showSnack({
        msg: 'Login Failed',
        type: 'error',
      });
      yield put(loginActions.ProcessLoginAppFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchSetTokenProcess() {
  try {
    removeAll();
    const token = loadString(MMKV_KEY.APP_TOKEN);

    if (token && typeof token === 'string') {
      yield put(loginActions.processSetAppTokenSuccess(token));
      yield put(appActions.processEndLoadApp());
    } else {
      yield put(appActions.processEndLoadApp());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield takeEvery<any>(loginActions.processLoginApp.type, watchLoginProcess);
  yield takeEvery<any>(
    loginActions.processSetAppToken.type,
    watchSetTokenProcess,
  );
}
