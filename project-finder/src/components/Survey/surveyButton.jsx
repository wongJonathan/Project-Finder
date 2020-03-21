import React from 'react';
import PropTypes from 'prop-types';

import './surveyButton.sass';


const SurveyButton = ({ props, content, selected }) => (
  selected
    ? (
      <button className="survey-button-on" aria-label="selected" type="button" {...props}>
        {content}
      </button>
    )
    : (
      <button className="survey-button-off" aria-label="not selected" type="button" {...props}>
        {content}
      </button>
    )
);

SurveyButton.defaultProps = {
  props: {},
  selected: false,
};

SurveyButton.propTypes = {
  props: PropTypes.oneOfType([PropTypes.object]),
  content: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.bool]),
};

export default SurveyButton;
