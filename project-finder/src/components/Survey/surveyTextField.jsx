import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './surveyTextField.sass';


const SurveyTextField = ({ props, onChange }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    // iOS detection from: stackoverflow.com/a/9039885 with explanation about MSStream
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      const inputs = document.querySelectorAll('input[type="number"]');
      inputs.forEach((inputElement) => {
        inputElement.setAttribute('pattern', '\\d*');
      });
    }
  });

  return (
    <input
      {...props}
      value={input}
      onChange={handleChange}
    />
  );
};

SurveyTextField.defaultProps = {
  props: {},
};

SurveyTextField.propTypes = {
  props: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default SurveyTextField;
