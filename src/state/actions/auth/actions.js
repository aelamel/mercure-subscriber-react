import AuthActionTypes from './types';

export const signIn = (userId) => {
    return {
        type: AuthActionTypes.SIGNIN,
        payload: userId 
    }
}

export const signOut = () => {
    return {
        type: AuthActionTypes.SIGNOUT,
    }
}