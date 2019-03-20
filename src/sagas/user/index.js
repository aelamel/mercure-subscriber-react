import UserActionTypes from '../../state/actions/user/types';
import { takeLatest } from "redux-saga/effects";

import {loadUserPostsSaga} from './user.sagas';

export const loadUserPostsHandler = takeLatest(UserActionTypes.LOAD_USER_POSTS, loadUserPostsSaga);