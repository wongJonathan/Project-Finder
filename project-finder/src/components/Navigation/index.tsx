import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'firebase';

import {
  SIGN_IN, LANDING, HOME, ACCOUNT,
} from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const NavigationNonAuth = (): ReactElement => (
  <ul>
    <li>
      <Link to={LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

const NavigationAuth = (): ReactElement => (
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
      <SignOutButton />
    </li>
  </ul>
);

const Navigation = (): ReactElement => {
  const authUser = useContext<User | null>(AuthUserContext);

  return (
    <>
      {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </>
  );
};

export default Navigation;
