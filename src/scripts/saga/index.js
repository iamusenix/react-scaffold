import { fork } from 'redux-saga/effects';
import appSaga from './AppSaga';

export default function* rootSaga() {
    yield fork(appSaga);
}