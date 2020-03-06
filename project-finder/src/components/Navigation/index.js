import React from 'react';
import { Link } from 'react-router-dom';

import {SIGN_IN, LANDING, HOME, ACCOUNT} from '../../constants/routes';
import SignOutButton from "../SignOut";
import { AuthUserContext } from '../Session';

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={HOME}>Home</Link>
    </li>
    <li>
      <Link to={ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton/>
    </li>
  </ul>
);

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;
