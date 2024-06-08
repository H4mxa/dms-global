import {all, fork} from 'redux-saga/effects';

import * as App from '@redux/app/sagas';

export default function* rootSaga() {
  yield all([...Object.values(App)].map(fork));
}
