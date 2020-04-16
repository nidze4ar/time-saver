import React from 'react';
import ReactDOM from 'react-dom';
import {StoredApp} from './store/container';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StoredApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
