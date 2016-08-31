import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import { expect } from 'chai';

import Results from '../../src/components/Results';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Bear', 'Lion');
    const tally = Map({'Bear': 5});
    const component = renderIntoDocument(
        <Results pair={pair} tally={tally} />
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [bear, lion] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(bear).to.contain('Bear');
    expect(bear).to.contain('5');
    expect(lion).to.contain('Lion');
    expect(lion).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Bear', 'Lion');
    const component = renderIntoDocument(
        <Results pair={pair}
                 tally={Map()}
                 next={next}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
        <Results winner="Bear"
                 pair={['Bear', 'Lion']}
                 tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Bear');
  });

});
