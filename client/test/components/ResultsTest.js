import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-dom/test-utils';
import {List, Map} from 'immutable';
import { Results } from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {
    it('renders entries with vote counts or zero', () => {
        const pair = List.of('Phoenix Wright', 'Shadow Of The Colossus');
        const tally = Map({'Shadow Of The Colossus': 20});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [first, second] = entries.map(entry => entry.textContent);

        expect(entries.length).to.equal(2);
        expect(first).to.contain('Phoenix Wright');
        expect(first).to.contain('0');
        expect(second).to.contain('Shadow Of The Colossus')
        expect(second).to.contain('20')
    });

    it('invokes the next callback when the next button is clicked', () => {
        let nextCbExecuted = false;
        const next = () => nextCbExecuted = true;
        const pair = List.of('Phoenix Wright', 'Shadow Of The Colossus');
        const component = renderIntoDocument(
            <Results pair={pair} tally={Map()} next={next} />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));
        
        expect(nextCbExecuted).to.equal(true);
    });

    it('renders the winner after a vote', () => {
        const component = renderIntoDocument(
            <Results 
                winner="Phoenix Wright"
                pair={List.of('Phoenix Wright', 'Shadow Of The Colossus')} 
                tally={Map()} />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.exist;
        expect(winner.textContent).to.contain('Phoenix Wright');
    });
});