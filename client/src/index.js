import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import { setState } from './actionCreators';
import remoteActionMiddleware from './remoteActionMiddleware';

const socket = io(`${window.location.protocol}//${window.location.hostname}:7001`);
socket.on('state', state => {
    store.dispatch(setState(state));
});

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route component={App}/>
        </HashRouter>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();