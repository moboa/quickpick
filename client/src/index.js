import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { List, Map } from 'immutable';
import { createStore } from 'redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';

const pair = List.of('Phoenix Wright', 'Shadow Of The Colossus');
const tally = Map({'Phoenix Wright': 4, 'Shadow Of The Colossus': 2});

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
    <HashRouter>
        <Route render={() => <App pair={pair} tally={tally} />} />
    </HashRouter>, 
    document.getElementById('root')
);
registerServiceWorker();