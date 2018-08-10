import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer'

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Portal']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({ entries: ['Portal'] }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({ entries: ['Portal', 'FIFA'] });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);
    
        expect(nextState).to.equal(fromJS({
          vote: { pair: ['Portal', 'FIFA'] },
          entries: []
        }));
      });
    
      it('handles VOTE', () => {
        const initialState = fromJS({
          vote: { pair: ['Portal', 'FIFA'] },
          entries: []
        });
        const action = {type: 'VOTE', entry: 'Portal'};
        const nextState = reducer(initialState, action);
    
        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ['Portal', 'FIFA'],
            tally: {Portal: 1}
          },
          entries: []
        }));
      });

      it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['FIFA']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
          entries: ['FIFA']
        }));
      });

      it('can be used with reduce', () => {
        const actions = [
          {type: 'SET_ENTRIES', entries: ['Portal', 'FIFA']},
          {type: 'NEXT'},
          {type: 'VOTE', entry: 'FIFA'},
          {type: 'VOTE', entry: 'Portal'},
          {type: 'VOTE', entry: 'FIFA'},
          {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());
      
        expect(finalState).to.equal(fromJS({
          winner: 'FIFA'
        }));
      });
});