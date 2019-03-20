
import {sessionService} from 'redux-react-session';
import {put} from 'redux-saga/effects';

import * as UserActions from '../../state/actions/user/actions';


import axios from '../../config/axios';

export function *loadUserPostsSaga() {

    const user = yield sessionService.loadUser();

    const userPosts = yield axios.get('users/' + user.id + '/posts');
    
    yield put(UserActions.setUserData({
        ...user,
        posts: userPosts.data.posts
    }));
}