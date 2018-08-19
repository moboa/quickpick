import makeStore from './src/store';
import { startServer } from './src/server';

export const store = makeStore();
startServer(store);
console.log('Listening on port 7001.');

store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./testEntries.json')
});
store.dispatch({type: 'NEXT'});