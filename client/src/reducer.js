import { List, Map } from 'immutable';

export default function reducer(state = Map(), action) {
    switch(action.type) {
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
        default:
            return state;
    }
}

// Returns state with updated properties.
function setState(state, newState) {
    return state.merge(newState);
}

// Sets hasVotedFor property to entry in the state object.
function vote(state, entry) {
    const currentVotePair = state.getIn(['vote', 'pair']);

    if (currentVotePair && currentVotePair.includes(entry)) {
        return state.set('hasVotedFor', entry);
    }
    return state;
}

// Unsets hasVotedFor property in the state object.
function resetVote(state) {
    const hasVotedFor = state.get('hasVotedFor');
    const currentVotePair = state.getIn(['vote', 'pair'], List());

    if (hasVotedFor && !currentVotePair.includes(hasVotedFor)) {
        return state.remove('hasVotedFor');
    }
    return state;
}