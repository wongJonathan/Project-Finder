import React, { useState, useEffect, ChangeEvent } from 'react';

import './surveyTextField.sass';

interface SurveyTextFieldProps {
  props?: React.HTMLAttributes<HTMLInputElement>;
  onChange: (choice: string | number) => void;
  type?: string;
}


const SurveyTextField = ({ props, onChange, type }: SurveyTextFieldProps) => {
  const [input, setInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      type={type || 'string'}
    />
  );
};

export default SurveyTextField;
