import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SurveyButton from './surveyButton';


const RoleChoice = ({ choices }) => {
  // eslint-disable-next-line no-unused-vars
  const [choice, setChoice] = useState(0);

  const onClick = (name) => () => {
    setChoice(name);
  };

  return (
    <>
      {choices.map((name) => (
        <SurveyButton key={name} props={{ onClick: onClick(name) }} content={name} />
      ))}
    </>
  );
};

RoleChoice.propTypes = {
  choices: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default RoleChoice;
