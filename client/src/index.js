import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { List, Map } from 'immutable';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const pair = List.of('Phoenix Wright', 'Shadow Of The Colossus');
const tally = Map({'Phoenix Wright': 4, 'Shadow Of The Colossus': 2});

ReactDOM.render(
    <HashRouter>
        <Route render={() => <App pair={pair} tally={tally} />} />
    </HashRouter>, 
    document.getElementById('root')
);
registerServiceWorker();