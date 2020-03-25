import React, { ReactElement, ReactNode } from 'react';

import './surveyButton.sass';

interface SurveyButtonProps {
  props?: React.HTMLAttributes<HTMLButtonElement>;
  content: ReactNode;
  selected?: boolean;
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
