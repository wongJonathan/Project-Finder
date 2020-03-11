import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => (
      props.firebase.auth.onAuthStateChanged((receivedUser) => {
        setAuthUser(receivedUser || null);
      })
    ), [props]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  WithAuthentication.propTypes = {
    firebase: PropTypes.elementType.isRequired,
    history: PropTypes.elementType.isRequired,
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
