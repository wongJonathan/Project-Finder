import React, { useState } from 'react';

import './projectPreference.sass';
import RoleChoice from './roleChoice';
import DraggableList from './draggableList';


const CATEGORY_NAMES = ['Web', 'Android App', 'iOS App', 'Voice'];
const CHOICES = [
  'UX Designer',
  'Visual Designer',
  'Fullstack Designer',
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Other',
];

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
      <RoleChoice choices={CHOICES} />
      <h2>
        How many hours a week will you commit to a project?
      </h2>
      <h2>
        Are you willing to work remotely?
      </h2>

    </div>
  );
};

export default ProjectPreference;
