import React, { Component } from 'react'
import PostComponent from './PostComponent';
import Grid from '@material-ui/core/Grid';

import axios from '../../config/axios';
import {connect} from 'react-redux';
import {find} from 'lodash';

import * as PostsActions from '../../state/actions/posts/actions';
import * as UserActions from '../../state/actions/user/actions';

class PostsComponent extends Component {
  
    state = {
        posts: []
    }

    async componentDidMount() {
        this.props.loadUserPosts();
        const response = await axios.get('posts');
        this.setState({
            posts: response.data.posts
        });
    }

    subscribeHandler = async (post) => {
        this.props.subscribe(post);
    }
  
    unsubscribeHandler = async (post) => {
        this.props.unsubscribe(post);
    }

    render() {
        const posts = this.state.posts;  
        const userPosts = this.props.user.posts;  
        return (
        <React.Fragment>
            <Grid container spacing={24}>
                {posts.map((post, index) => {
                    const subscribedPost = find(userPosts, (item) => {
                        return item.id === post.id
                    });
                    post.subscribedTo = (subscribedPost !== undefined);
                    return (
                        <Grid item xs key={index}>
                            <PostComponent post={post} key={index} 
                                onSubscribe={this.subscribeHandler} 
                                onUnSubscribe={this.unsubscribeHandler}/>
                        </Grid>
                        
                    )
                })}
            </Grid>
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        subscribe: (post) => dispatch(PostsActions.subscribe(post)),
        unsubscribe: (post) => dispatch(PostsActions.unsubscribe(post)),
        loadUserPosts: () => dispatch(UserActions.loadUserPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent);