import {put} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import { sessionService } from 'redux-react-session';

import axios from '../../config/axios';

export function *signInSaga(action) {

    const authResponse = yield axios.post('/users/signin', action.payload, {
        //AxiosRequestConfig parameter
        withCredentials: true //correct
      });
    const {posts, ...userData} = authResponse.data.user;
    
    yield sessionService.saveSession(authResponse.headers.authorization);
    yield sessionService.saveUser(JSON.stringify(userData));
    yield put(push('/posts'));
}

export function *signOutSaga() {

    const user = yield sessionService.loadUser();
    yield axios.post('/users/logout', {user: {id: (JSON.parse(user)).id}});
    yield sessionService.deleteUser();
    yield sessionService.deleteSession();
    yield put(push('/signin'));
}