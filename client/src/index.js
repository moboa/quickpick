import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { List, Map } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Phoenix Wright', 'Shadow Of The Colossus'],
            tally: {'Phoenix Wright': 1}
        }
    }
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