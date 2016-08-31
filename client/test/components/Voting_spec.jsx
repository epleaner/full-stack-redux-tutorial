import React from 'react';
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import { expect } from 'chai';

import Voting from '../../src/components/Voting';

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Bear", "Lion"]} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Bear');
    expect(buttons[1].textContent).to.equal('Lion');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith = '';
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Bear", "Lion"]}
              vote={vote} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Bear');
  });

  it('disables after a user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Bear", "Lion"]} hasVoted="Bear" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds a label after a user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Bear", "Lion"]} hasVoted="Bear" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Bear" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Bear');
  });

  it('renders as a pure component', () => {
    const pair = ['Bear', 'Lion'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
        <Voting pair={pair} />, container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Bear');

    pair[0] = 'Fish';
    component = ReactDOM.render(
        <Voting pair={pair} />, container
    );

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Bear');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Bear', 'Lion');
    const container = document.createElement('div');
    let component = ReactDOM.render(
        <Voting pair={pair} />, container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Bear');

    const newPair = pair.set(0, 'Fish');
    component = ReactDOM.render(
        <Voting pair={newPair} />, container
    );

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Fish');
  });
});
