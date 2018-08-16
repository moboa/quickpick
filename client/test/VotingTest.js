import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils';
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
    
});