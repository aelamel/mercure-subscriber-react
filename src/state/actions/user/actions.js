import UserActionTypes from './types';


export const setUserData = (user) => {
    return {
        type: UserActionTypes.SET_USER_DATA,
        user: user
    }
}


export const loadUserPosts = () => {
    return {
        type: UserActionTypes.LOAD_USER_POSTS
    }
}