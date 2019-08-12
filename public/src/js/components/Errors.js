import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ isSelectError }) => {
  return (
    <div className="pathfinder__error-message-container">
      <p className={`pathfinder__error-message pathfinder__error-message-select ${isSelectError ? 'pathfinder__error-message--show' : ''}`}>Error: please select an origin and a destination</p>
    </div>
  )
};

Errors.propTypes = {
  isSelectError: PropTypes.bool.isRequired
};

export default Errors;