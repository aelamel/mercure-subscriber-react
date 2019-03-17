import React, { Component } from 'react'
import PostComponent from './PostComponent';
import Grid from '@material-ui/core/Grid';

import axios from '../../config/axios';

export default class PostsComponent extends Component {
  
    state = {
        posts: []
    }

    async componentDidMount() {
        const response = await axios.get('posts');
        this.setState({
            posts: response.data.posts
        });
    }
  
    render() {
        const posts = this.state.posts;  
        return (
        <React.Fragment>
            <Grid container spacing={24}>
                {posts.map((post, index) => {
                    return (
                        <Grid item xs key={index}>
                            <PostComponent post={post} key={index}/>
                        </Grid>
                        
                    )
                })}
            </Grid>
        </React.Fragment>
        )
    }
}
