import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Bear', 'Lion');
const tally = Map({'Bear': 5, 'Lion': 4});

export default React.createClass({
    render: function() {
        return React.cloneElement(this.props.children, {pair: pair, tally: tally});
    }
});