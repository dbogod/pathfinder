import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ isSelectError, isMatchError }) => {
  return (
    <div className="pathfinder__error-message-container">
      <p className={`pathfinder__error-message pathfinder__error-message-select ${isSelectError ? 'pathfinder__error-message--show' : ''}`}>Error: please select an origin and a destination</p>
      <p className={`pathfinder__error-message pathfinder__error-message-match ${isMatchError ? 'pathfinder__error-message--show' : ''}`}>Error: the origin and the destination are the same</p>
    </div>
  )
};

Errors.propTypes = {
  isSelectError: PropTypes.bool.isRequired,
  isMatchError: PropTypes.bool.isRequired
};

export default Errors;