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

export const connectToHub = () => {
    return {
        type: AuthActionTypes.CONNECT_TO_HUB,
    }
}