import React, { ReactElement, useState } from 'react';

import './projectPreference.sass';
import Choices from './choices';
import DraggableList from './draggableList';
import SurveyTextField from './surveyTextField';

interface UserChoices {
  [attribute: string]: string | number | string[] | number[];
}


const CATEGORY_NAMES = ['Web', 'Android App', 'iOS App', 'Voice'];
const ROLE_CHOICES = [
  'UX Designer',
  'Visual Designer',
  'Fullstack Designer',
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Other',
];
const REMOTE_CHOICE = ['Yes', 'No'];

const QuestionComponent = ({ text }: {text: string}): ReactElement => (
  <div className="project-question">
    {text}
  </div>
);

const ProjectPreference = (): ReactElement => {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [userPreferences, setUser] = useState<UserChoices>({});

  const getChanges = (attributeName: string) => (
    value: string | number | string[] | number[],
  ): void => {
    setUser((prevState) => ({
      ...prevState,
      [attributeName]: value,
    }));
  };

  return (
    <div className="project-container">
      <QuestionComponent
        text="Rank the following project type in order of preference — 1 being your most preferred."
      />
      <DraggableList initialList={CATEGORY_NAMES} onChange={getChanges('projects')} />
      <div className="project-gap" />
      <QuestionComponent
        text="What best describes you?"
      />
      <Choices choices={ROLE_CHOICES} onChange={getChanges('roles')} />
      <div className="project-gap" />
      <QuestionComponent
        text="How many hours a week will you commit to a project?"
      />
      <SurveyTextField props={{ placeholder: 'Hours' }} type="number" onChange={getChanges('hours')} />
      <div className="project-gap" />
      <QuestionComponent
        text="Are you willing to work remotely?"
      />
      <Choices choices={REMOTE_CHOICE} onChange={getChanges('remote')} />
      <div className="project-gap" />
    </div>
  );
};

export default ProjectPreference;
