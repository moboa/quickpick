import { List, Map } from '../node_modules/immutable';

/**
 * Return winner or winners of the current vote.
 * @param {Map} vote 
 * @returns {string[]} 
 */
function getWinners(vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}

/**
 * Set the list of entries to be voted on.
 * @param {Map} state 
 * @param {Array} entries 
 * @returns {Map} updated state
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/**
 * Proceed to the next vote.
 * @param {Map} state 
 * @returns {Map} updated state
 */
export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    if (entries.size === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    }
    return state.merge({
      vote: Map({ pair: entries.take(2) }),
        entries: entries.skip(2)
    });
}

/**
 * Increment the vote talley for the entry.
 * @param {Map} state 
 * @param {string} entry 
 * @returns {Map} updated state
 */
export function vote(state, entry) {
    return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}