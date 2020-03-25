import React, { ReactElement, useContext } from 'react';

import Firebase, { FirebaseContext } from '../Firebase';


const SignOutButton = (): ReactElement => {
  const firebase = useContext<Firebase>(FirebaseContext);

  return (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
