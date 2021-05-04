import { all, fork } from 'redux-saga/effects';
// sagas
import { sagaWatcherUser } from 'redux/user/saga';

export function* sagaWatcher() {
  yield all([fork(sagaWatcherUser)]);
}
