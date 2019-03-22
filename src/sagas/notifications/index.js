import { takeLatest } from "redux-saga/effects";
import {listenToEventsSaga} from './notification.sagas';
import AuthActionTypes from '../../state/actions/auth/types';

export const notificationHandler = takeLatest(AuthActionTypes.CONNECT_TO_HUB, listenToEventsSaga)