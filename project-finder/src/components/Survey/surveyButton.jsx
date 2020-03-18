import React from 'react';
import PropTypes from 'prop-types';

import './surveyButton.sass';


const SurveyButton = ({ props, content, selected }) => (
  selected
    ? (
      <button className="survey-button-on" type="button" {...props}>
        {content}
      </button>
    )
    : (
      <button className="survey-button-off" type="button" {...props}>
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
  ]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.bool]),
};

export default SurveyButton;
