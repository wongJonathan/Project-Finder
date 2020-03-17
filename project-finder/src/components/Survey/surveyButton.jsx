import React from 'react';
import PropTypes from 'prop-types';

import './surveyButton.sass';


const SurveyButton = ({ props, content }) => (
  <button type="button" {...props}>
    {content}
  </button>
);

SurveyButton.defaultProps = {
  props: {},
};

SurveyButton.propTypes = {
  props: PropTypes.oneOfType([PropTypes.object]),
  content: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
  ]).isRequired,
};

export default SurveyButton;
