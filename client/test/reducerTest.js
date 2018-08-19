import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Phoenix Wright', 'Shadow Of The Colossus'),
                    tally: Map({ 'Phoenix Wright': 2 })
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.be(fromJS({
            vote: {
                pair: ['Phoenix Wright', 'Shadow Of The Colossus'],
                tally: { 'Phoenix Wright': 2 }
            }
        }));
    });

    it('handles SET_STATE with plain JS objects', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Phoenix Wright', 'Shadow Of The Colossus'],
                    tally: { 'Phoenix Wright': 2 }
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.be(fromJS({
            vote: {
                pair: ['Phoenix Wright', 'Shadow Of The Colossus'],
                tally: { 'Phoenix Wright': 2 }
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const initialState = undefined;
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Phoenix Wright', 'Shadow Of The Colossus'],
                    tally: { 'Phoenix Wright': 2 }
                }
            }
        };
        const nextState = reducer(initialState, action);

    });
});