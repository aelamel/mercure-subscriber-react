import { all } from "redux-saga/effects";

import * as authSagas from "./auth";
import * as userSagas from "./user";
import * as postSagas from "./posts";
import * as notificationsSagas from "./notifications";

export default function* watchAll() {
  yield all([
    yield authSagas.signInHandler,
    yield authSagas.signOutHandler,
    yield notificationsSagas.notificationHandler,
    yield userSagas.loadUserPostsHandler,
    yield postSagas.subscribeHandler,
    yield postSagas.unsubscribeHandler,
    yield postSagas.fetchPostsHandler
  ]);
}
