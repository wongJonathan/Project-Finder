import React, { ReactElement } from 'react';

import './surveyButton.sass';

interface SurveyButtonProps {
  props: any;
  content: ReactElement | string | number;
  selected: boolean;
}

const SurveyButton = ({ props, content, selected }: SurveyButtonProps): ReactElement => (
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

export default SurveyButton;
