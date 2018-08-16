import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Voting from './components/Voting';
import registerServiceWorker from './registerServiceWorker';

const pair = ['Phoenix Wright', 'Shadow Of The Colossus'];

ReactDOM.render(<Voting pair={pair} />, document.getElementById('root'));
registerServiceWorker();