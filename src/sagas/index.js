import {all} from 'redux-saga/effects';

import * as authSagas from './auth/';

export default function *watchAll() {
    yield all([
        yield authSagas.signInHandler,
        yield authSagas.signOutHandler
    ]);
}