import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

describe ('store', () => {
    it('is correctly configured', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['PES 2018', 'FM 2018']
        });

        expect(store.getState()).to.equal(fromJS({ entries: ['PES 2018', 'FM 2018'] }));
    });
});