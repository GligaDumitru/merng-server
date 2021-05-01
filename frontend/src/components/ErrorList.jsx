import React from 'react';
import PropTypes from 'prop-types';
const ErrorList = ({ errors }) => {
  return (
    <div className='ui error message'>
      <ul className='list'>
        {errors.length > 0 &&
          errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
    </div>
  );
};
ErrorList.propTypes = {
  errors: PropTypes.array.isRequired,
};
export default ErrorList;
