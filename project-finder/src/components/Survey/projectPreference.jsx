import React, { useState } from 'react';

import './projectPreference.sass';
import Choices from './choices';
import DraggableList from './draggableList';
import SurveyTextField from './surveyTextField';


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

const ProjectPreference = () => {
  // eslint-disable-next-line no-unused-vars
  const [userPreferences, setUser] = useState({});

  return (
    <div className="project-container">
      <h2>
        Rank the following project type in order of preference - 1 being your most preferred.
      </h2>
      <DraggableList initialList={CATEGORY_NAMES} />
      <h2>
        What best describes you?
      </h2>
      <Choices choices={ROLE_CHOICES} />
      <h2>
        How many hours a week will you commit to a project?
      </h2>
      <SurveyTextField placeholder="Hours" />
      <h2>
        Are you willing to work remotely?
      </h2>
      <Choices choices={REMOTE_CHOICE} />
    </div>
  );
};

export default ProjectPreference;
