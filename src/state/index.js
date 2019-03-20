import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootSaga from '../sagas';
import { sessionService } from 'redux-react-session';
import { sessionReducer } from 'redux-react-session';
import userReducer from './reducers/user.reducer';
import notificationReducer from './reducers/notification.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const reducers = combineReducers({
    userState: userReducer,
    notificaton: notificationReducer,
    router: connectRouter(history),
    session: sessionReducer

});


const store = createStore(reducers,
    {},
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    ));

export {
    store,
    history
};
const validateSession = (session) => {
    // check if your session is still valid
    return true;
}
const options = { refreshOnCheckAuth: true, redirectPath: '/signin', driver: 'COOKIES', validateSession };
  
sessionService.initSessionService(store, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

sagaMiddleware.run(rootSaga);