
import { eventChannel } from 'redux-saga';
import {createNotification, NOTIFICATION_TYPE_INFO} from 'react-redux-notify';
import {put, take} from 'redux-saga/effects';

let eventSource = null;

export function *listenToEventsSaga() {

    const url = yield new URL('http://localhost:3333/hub');
    url.searchParams.append('topic', 'http://local.dev/notifications');
    
    if (eventSource !== null) {
        eventSource.close();
    }
    eventSource = yield new EventSource(url, {withCredentials: true});

    const channel = eventChannel(emitter => {
        eventSource.onmessage = function(e) {
           emitter({ e });
        };
        
        // Return an unsubscribe method
        return () => {
            // Perform any cleanup you need here
            eventSource.close();
        };
    });
    const { e } = yield take(channel);
    if (e) {
        const mySuccessNotification = {
            message: JSON.parse(e.data).message,
            type: NOTIFICATION_TYPE_INFO,
            duration: 2000,
            canDismiss: true
            }
        yield put(createNotification(mySuccessNotification));
    }
        
}