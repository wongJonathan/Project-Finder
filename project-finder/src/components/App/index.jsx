import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import LandingPage from '../Landing';
import HomePage from '../Home';
import {
  SIGN_UP, SIGN_IN, LANDING, HOME, ACCOUNT, PASSWORD_CHANGE, PASSWORD_FORGET,
} from '../../constants/routes';
import SignInPage from '../SignIn';
import { withAuthentication } from '../Session';
import AccountPage from '../Account';
import PasswordChangeForm from '../PasswordChange';
import PasswordForgetPage from '../PasswordForget';


const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={LANDING} component={LandingPage} />
      <Route path={SIGN_IN} component={SignInPage} />
      <Route path={SIGN_UP} component={SignUpPage} />
      <Route path={HOME} component={HomePage} />
      <Route path={ACCOUNT} component={AccountPage} />
      <Route path={PASSWORD_CHANGE} component={PasswordChangeForm} />
      <Route path={PASSWORD_FORGET} component={PasswordForgetPage} />
    </div>
  </Router>
);

export default withAuthentication(App);