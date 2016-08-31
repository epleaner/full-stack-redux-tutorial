import React from 'react';
import ReactDOM from 'react-dom';

import Voting from './components/Voting';

const pair = ['Bear', 'Lizard'];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
