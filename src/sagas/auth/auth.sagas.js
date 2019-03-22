import {put} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import { sessionService } from 'redux-react-session';

import axios from '../../config/axios';
import * as UserActions from '../../state/actions/user/actions';


export function *signInSaga(action) {

    const authResponse = yield axios.post('/users/signin', action.payload);
    const userData = authResponse.data.user;
    
    yield sessionService.saveSession(authResponse.headers.authorization);
    yield sessionService.saveUser(userData);
    yield put(UserActions.setUserData(userData));
    yield put(push('/posts'));
}

export function *signOutSaga() {

    const user = yield sessionService.loadUser();
    yield axios.post('/users/logout', {user: {id: user.id}});
    yield sessionService.deleteUser();
    yield sessionService.deleteSession();
    yield put(push('/signin'));
}

