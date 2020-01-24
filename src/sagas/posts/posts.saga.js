import { sessionService } from "redux-react-session";
import { put } from "redux-saga/effects";
import { findIndex } from "lodash";

import axios from "../../config/axios";

import * as UserActions from "../../state/actions/user/actions";
import * as AuthActions from "../../state/actions/auth/actions";
import * as PostsActions from "../../state/actions/posts/actions";

export function* subscribeSaga(action) {
  const user = yield sessionService.loadUser();

  yield axios.put("posts/" + action.post.id + "/subscribe", {
    user: user.id
  });
  const userPosts = user.posts;
  const userData = {
    ...user,
    posts: [...userPosts, action.post]
  };
  yield put(UserActions.setUserData(userData));
  yield put(AuthActions.connectToHub());
  yield sessionService.saveUser(userData);
}

export function* unsubscribeSaga(action) {
  const user = yield sessionService.loadUser();

  yield axios.put("posts/" + action.post.id + "/unsubscribe", {
    user: user.id
  });

  let userPosts = user.posts;
  const postToDeleteIndex = findIndex(
    userPosts,
    post => post.id === action.post.id
  );
  userPosts.splice(postToDeleteIndex, 1);
  const userData = {
    ...user,
    posts: userPosts
  };
  yield put(UserActions.setUserData(userData));
  yield put(AuthActions.connectToHub());
  yield sessionService.saveUser(userData);
}

export function* fetchPostSaga(action) {
  const response = yield axios.get("posts");

  yield put(PostsActions.setPosts(response.data.posts));
}
