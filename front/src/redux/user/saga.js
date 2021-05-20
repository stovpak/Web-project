import { takeEvery, put, call } from 'redux-saga/effects';
import { clearLikes, openSoket } from '../reducers/reducers';
const ws = new WebSocket('ws://localhost:8081');

export function* ensureClearLocalStorage() {
  try {
    yield (ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'Connect',
          topicId: 1,
        })
      );
    });

    yield (ws.onclose = evt => {
      console.log(
        'Socket is closed.Reconnect will be attempted in 10 second.',
        evt.reason
      );
    });
  } catch (e) {
    console.log(e);
  }
}

export function* ensureLogOut() {
  try {
    yield put(clearLikes());
  } catch (e) {
    console.log(e);
  }
}
export function* sagaWatcherUser() {
  yield takeEvery(openSoket, ensureClearLocalStorage);
  yield takeEvery(openSoket, ensureClearLocalStorage);
}
