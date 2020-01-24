import PostsActionTypes from "./types";

export const subscribe = post => {
  return {
    type: PostsActionTypes.SUBSCRIBE,
    post: post
  };
};

export const unsubscribe = post => {
  return {
    type: PostsActionTypes.UNSUBSCRIBE,
    post: post
  };
};

export const fetchPosts = () => {
  return {
    type: PostsActionTypes.FETCH_POSTS
  };
};

export const setPosts = posts => {
  return {
    type: PostsActionTypes.FETCH_POSTS_SUCCESS,
    posts: posts
  };
};

export const updatePost = post => {
  return {
    type: PostsActionTypes.UPDATE_POST,
    post: post
  };
};
