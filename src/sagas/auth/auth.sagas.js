import {put} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import { sessionService } from 'redux-react-session';

import axios from '../../config/axios';
import * as UserActions from '../../state/actions/user/actions';
import * as NotificationActions from '../../state/actions/notification/actions';

let eventSource = null;

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

export function *listenToEventsSaga() {

    const url = yield new URL('http://localhost:3333/hub');
    url.searchParams.append('topic', 'http://local.dev/notifications');
    
    if (eventSource !== null) {
        eventSource.close();
    }
    eventSource = yield new EventSource(url, {withCredentials: true});
    
    // The callback will be called every time an update is published
    eventSource.onmessage = (e) => {
        console.log(e);
        
        put(NotificationActions.showNotification(JSON.parse(e.data).message));

        setTimeout(() => {
            
        }, 2000);
    }
}