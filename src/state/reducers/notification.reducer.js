import NotificationActionTypes from '../actions/notification/types';

const initialState = {
    notificationMessage: ''
}

const notificationReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case NotificationActionTypes.SHOW_NOTIFICATION: 
            return {
                ...state,
                notificationMessage: action.notification
            };
        case NotificationActionTypes.HIDE_NOTIFICATION: 
            return {
                ...state,
                notificationMessage: ''
            };
        default:
            return state;
    }
}

export default notificationReducer;