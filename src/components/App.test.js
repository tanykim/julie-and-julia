import React from 'react';
import ReactDOM from 'App-dom';
import App from './SearchForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
