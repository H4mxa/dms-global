import {all, fork} from 'redux-saga/effects';

import * as App from '@redux/app/sagas';
import * as Login from '@redux/login/sagas';

export default function* rootSaga() {
  yield all([...Object.values(App)].map(fork));
  yield all([...Object.values(Login)].map(fork));
}
