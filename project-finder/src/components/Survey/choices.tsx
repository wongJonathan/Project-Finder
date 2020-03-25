import React, { ReactElement, useState } from 'react';

import SurveyButton from './surveyButton';

interface ChoicesProps {
  choices: string[] | number[];
  onChange: (choice: string | number) => void;
}


const Choices = ({ choices, onChange }: ChoicesProps): ReactElement => {
  const [choice, setChoice] = useState<string | number>();

  const onClick = (name: string | number) => (): void => {
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
