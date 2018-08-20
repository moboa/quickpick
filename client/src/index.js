import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';

const store = createStore(reducer);

const socket = io(`${window.location.protocol}//${window.location.hostname}:7001`);
socket.on('state', state => {
    store.dispatch({
        type: 'SET_STATE', 
        state: state
    });
});

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route component={App}/>
        </HashRouter>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();