import React from 'react';

const Result = () => {
  return (
    <div className="pathfinder__result">
      <p>Shortest distance: <span id="pathfinder__result-distance"></span></p>
      <p>Path: <span id="pathfinder__result-path"></span></p>
    </div>
  )
};

export default Result;