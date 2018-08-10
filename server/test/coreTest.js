import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

describe('Application Logic', () => {

    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = ['Portal', 'Batman: Arkham City', 'Phoenix Wright'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Portal', 'Batman: Arkham City', 'Phoenix Wright')
            }));
        });

    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Portal', 'Batman: Arkham City', 'Phoenix Wright')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Portal', 'Batman: Arkham City')
                }),
                entries: List.of('Phoenix Wright')
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Portal', 'Batman: Arkham City'),
                    tally: Map({
                        'Portal': 5,
                        'Batman: Arkham City': 4
                    })
                }),
                entries: List.of('Phoenix Wright', 'Uncharted', 'Shadow Of The Colossus')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Phoenix Wright', 'Uncharted')
                }),
                entries: List.of('Shadow Of The Colossus', 'Portal')
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Portal', 'Batman: Arkham City'),
                    tally: Map({
                        'Portal': 2,
                        'Batman: Arkham City': 2
                    })
                }),
                entries: List.of('Phoenix Wright', 'Uncharted', 'Shadow Of The Colossus')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Phoenix Wright', 'Uncharted')
                }),
                entries: List.of('Shadow Of The Colossus', 'Portal', 'Batman: Arkham City')
            }));
        });

        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Portal', 'Batman: Arkham City'),
                    tally: Map({
                        'Portal': 5,
                        'Batman: Arkham City': 4
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Portal'
            }));
        });
    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const voteState = Map({
                pair: List.of('Portal', 'Batman: Arkham City')
            });
            const nextVoteState = vote(voteState, 'Portal');
            expect(nextVoteState).to.equal(Map({
                pair: List.of('Portal', 'Batman: Arkham City'),
                tally: Map({
                    'Portal': 1
                })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const voteState = Map({
                pair: List.of('Portal', 'Batman: Arkham City'),
                tally: Map({
                    'Portal': 4,
                    'Batman: Arkham City': 4
                })
            });
            const nextVoteState = vote(voteState, 'Portal');
            expect(nextVoteState).to.equal(Map({
                pair: List.of('Portal', 'Batman: Arkham City'),
                tally: Map({
                    'Portal': 5,
                    'Batman: Arkham City': 4
                })
            }));
        });
    });
});