import PostsActionTypes from "../actions/posts/types";

const initialState = {
  posts: []
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts
      };
    case PostsActionTypes.UPDATE_POST:
      const postIndex = state.posts.findIndex(p => p.id === action.post.id);
      const actualPosts = [...state.posts];
      if (postIndex !== -1) {
        actualPosts[postIndex] = action.post;
      }

      return {
        ...state,
        posts: actualPosts
      };
    default:
      return state;
  }
};

export default postsReducer;
