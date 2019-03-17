
import AuthActionTypes from '../../state/actions/auth/types';

import { takeLatest } from "redux-saga/effects";

import {signInSaga, signOutSaga} from './auth.sagas';

export const signInHandler = takeLatest(AuthActionTypes.SIGNIN, signInSaga);
export const signOutHandler = takeLatest(AuthActionTypes.SIGNOUT, signOutSaga);