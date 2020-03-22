import React, { useState } from 'react';

import SurveyButton from './surveyButton';

interface ChoicesProps {
  choices: string[] | number[];
  onChange: (choice: string | number) => void;
}


const Choices = ({ choices, onChange }: ChoicesProps) => {
  const [choice, setChoice] = useState<string | number>();

  const onClick = (name: string | number) => () => {
    setChoice(name);
    onChange(name);
  };

  return (
    <>
      {(choices as Array<string | number>).map((name: string | number) => (
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

export default Choices;
