import PostsActionTypes from './types';

export const subscribe = (post) => {
    return {
        type: PostsActionTypes.SUBSCRIBE,
        post: post
    }
}


export const unsubscribe = (post) => {
    return {
        type: PostsActionTypes.UNSUBSCRIBE,
        post: post
    }
}