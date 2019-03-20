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
        console.log(this.props.user);
        this.props.loadUserPosts();
        const response = await axios.get('posts');
        this.setState({
            posts: response.data.posts
        });
    }

    subscribeHandler = async (post) => {
        //TODO: Transform to SAGA and update user posts there
        console.log('subscribe', post);
        // await axios.put('posts/'+ post.id +'/subscribe', {
        //     user: this.props.user.id
        // });
        this.props.subscribe(post);
    }
  
    unsubscribeHandler = async (post) => {
        //TODO: Transform to SAGA and update user posts there
        console.log('unsubscribe', post);
        // await axios.put('posts/'+ post.id +'/unsubscribe', {
        //     user: this.props.user.id
        // });
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