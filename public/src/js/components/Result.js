import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ isResult, distance, path }) => {
  return (
    <div className={`pathfinder__result ${isResult ? 'pathfinder__result--show' : ''}`}>
      <p>Shortest distance: <span id="pathfinder__result-distance">{ distance }</span></p>
      <p>Path: <span id="pathfinder__result-path">{ path }</span></p>
    </div>
  )
};

Result.propTypes = {
  isResult: PropTypes.bool.isRequired,
  distance: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default Result;