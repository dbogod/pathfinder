import React from 'react';

import Form from './components/Form';

const App = () => {
  window.addEventListener('click', () => {
    [...document.querySelectorAll('.open')].forEach(menu => {
      menu.classList.remove('open');
    });
  });
  return (
    <div className="outer-wrapper">
      <header>
        <h1 className="pathfinder__title">Pathfinder</h1>
      </header>
      <main>
        <Form />
      </main>
    </div>
  )
};

export default App;