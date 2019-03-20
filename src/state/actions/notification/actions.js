import NotificationActionTypes from './types';

export const showNotification = (message) => {
    return {
        type: NotificationActionTypes.SHOW_NOTIFICATION,
        notification: message
    }
}

export const hideNotification = () => {
    return {
        type: NotificationActionTypes.HIDE_NOTIFICATION
    }
}