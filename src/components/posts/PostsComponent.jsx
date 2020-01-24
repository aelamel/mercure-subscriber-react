import React, { useEffect } from "react";
import PostComponent from "./PostComponent";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { find } from "lodash";

import * as PostsActions from "../../state/actions/posts/actions";
import * as UserActions from "../../state/actions/user/actions";

const PostsComponent = props => {
  useEffect(() => {
    props.loadPosts();
    props.loadUserPosts();
  }, []);

  const subscribeHandler = async post => {
    props.subscribe(post);
  };

  const unsubscribeHandler = async post => {
    props.unsubscribe(post);
  };

  const posts = props.posts;
  const userPosts = props.user.posts;
  return (
    <React.Fragment>
      <Grid container spacing={24}>
        {posts.map((post, index) => {
          const subscribedPost = find(userPosts, item => {
            return item.id === post.id;
          });
          post.subscribedTo = subscribedPost !== undefined;
          return (
            <Grid item xs key={index}>
              <PostComponent
                post={post}
                key={index}
                onSubscribe={subscribeHandler}
                onUnSubscribe={unsubscribeHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userState.user,
    posts: state.postsState.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    subscribe: post => dispatch(PostsActions.subscribe(post)),
    unsubscribe: post => dispatch(PostsActions.unsubscribe(post)),
    loadPosts: () => dispatch(PostsActions.fetchPosts()),
    loadUserPosts: () => dispatch(UserActions.loadUserPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent);
