import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './surveyTextField.sass';


const SurveyTextField = ({ placeholder, onChange }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={input}
      onChange={handleChange}
    />
  );
};

SurveyTextField.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string]).isRequired,
  onChange: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default SurveyTextField;
