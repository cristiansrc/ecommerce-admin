import { authActions } from 'application/actions/auth'
import msauth from 'infrastructure/agent/msauth'
import { put, spawn, takeLatest } from 'redux-saga/effects';

function* getToken({ payload }) {
    yield put(authActions.getTokenPending());
    const {data, error} = yield msauth.post('', {
        mail: payload.email,
        password: payload.password
    });

    if(error.code !== 200){
        yield put(authActions.getTokenError(error));
    } else {
        yield put(authActions.getTokenSuccess(data));
    }
};

function* watchGetToken() {
  yield takeLatest(authActions.getToken.type, getToken);
}

export default function* rootSaga() {
    yield spawn(watchGetToken);
}