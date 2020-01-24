import keyMirror from "keymirror";

const PostsActionTypes = keyMirror({
  SUBSCRIBE: null,
  UNSUBSCRIBE: null,
  FETCH_POSTS: null,
  FETCH_POSTS_SUCCESS: null,
  UPDATE_POST: null
});

export default PostsActionTypes;
