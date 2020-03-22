import React, { ReactElement } from 'react';

import { withFirebase } from '../Firebase';
import { Firebase } from '../../types';

interface SignOutButtonProps {
  firebase: Firebase;
}

const SignOutButton = ({ firebase }: SignOutButtonProps): ReactElement => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
