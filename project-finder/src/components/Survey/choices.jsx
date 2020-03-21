import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SurveyButton from './surveyButton';


const Choices = ({ choices, onChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [choice, setChoice] = useState(0);

  const onClick = (name) => () => {
    setChoice(name);
    onChange(name);
  };

  return (
    <>
      {choices.map((name) => (
        <SurveyButton
          key={name}
          props={{ onClick: onClick(name) }}
          content={name}
          selected={name === choice}
        />
      ))}
    </>
  );
};

Choices.propTypes = {
  choices: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChange: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default Choices;
