import { takeLatest } from "redux-saga/effects";
import PostsActionTypes from "../../state/actions/posts/types";
import { subscribeSaga, unsubscribeSaga, fetchPostSaga } from "./posts.saga";

export const subscribeHandler = takeLatest(
  PostsActionTypes.SUBSCRIBE,
  subscribeSaga
);
export const unsubscribeHandler = takeLatest(
  PostsActionTypes.UNSUBSCRIBE,
  unsubscribeSaga
);
export const fetchPostsHandler = takeLatest(
  PostsActionTypes.FETCH_POSTS,
  fetchPostSaga
);
