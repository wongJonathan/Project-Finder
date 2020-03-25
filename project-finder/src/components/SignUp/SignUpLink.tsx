import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { SIGN_UP } from '../../constants/routes';

const SignUpLink = (): ReactElement => (
  <p>
    {'Don\'t have an account? '}
    <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpLink;
