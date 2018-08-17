import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-dom/test-utils';
import { List } from 'immutable';
import Voting from '../src/components/Voting';

describe('Voting', () => {
    it ('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={['Phoenix Wright', 'Shadow Of The Colossus']} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Phoenix Wright');
        expect(buttons[1].textContent).to.equal('Shadow Of The Colossus');
    });
    
    it ('invokes a callback when a button is clicked', () => {
        let votedFor;
        const vote = entry => votedFor = entry;
        const component = renderIntoDocument(
            <Voting pair={['Phoenix Wright', 'Shadow Of The Colossus']} 
                vote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        Simulate.click(buttons[0]);
        expect(votedFor).to.equal('Phoenix Wright');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['Phoenix Wright', 'Shadow Of The Colossus']} 
                hasVoted={'Phoenix Wright'} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        for (let button of buttons) {
            expect(button.hasAttribute('disabled')).to.equal(true);
        }
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={['Phoenix Wright', 'Shadow Of The Colossus']} 
                hasVoted={'Phoenix Wright'} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner="Phoenix Wright" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.not.be.null;
        expect(winner.textContent).to.be.contain('Phoenix Wright');
    });

    it('renders as pure component', () => {
        const pair = ['Phoenix Wright', 'Shadow Of The Colossus'];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Phoenix Wright');

        pair[0] = 'Bioshock'
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Phoenix Wright');
    });

    it('does update DOM when prop changes', () => {
        const pair = List.of('Phoenix Wright', 'Shadow Of The Colossus');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Phoenix Wright');

        const newPair = pair.set(0, 'Bioshock');
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Phoenix Wright');
    });
});