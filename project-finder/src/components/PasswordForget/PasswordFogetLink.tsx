import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { PASSWORD_FORGET } from '../../constants/routes';


const PasswordForgetLink = (): ReactElement => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetLink;
