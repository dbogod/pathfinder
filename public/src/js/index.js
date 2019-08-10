import '../scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('root')) {
    const wrapper = document.getElementById('root');
    ReactDOM.render(<App/>, wrapper);
  }
});