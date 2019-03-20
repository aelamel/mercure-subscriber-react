import UserActionTypes from '../actions/user/types';

const initialState = {
    user: {}
}


const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case UserActionTypes.SET_USER_DATA:
            return {
                ...state,
                user: action.user
            }
    
        default:
            return state;
    }
}

export default userReducer;