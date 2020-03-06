import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import LandingPage from "../Landing";
import HomePage from "../Home";
import { SIGN_UP, SIGN_IN, LANDING, HOME } from '../../constants/routes';
import SignInPage from "../SignIn";
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthentication } from '../Session';


const App = () => {

  return (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={LANDING} component={LandingPage} />
        <Route path={SIGN_IN} component={SignInPage} />
        <Route path={SIGN_UP} component={SignUpPage} />
        <Route path={HOME} component={HomePage} />
      </div>
    </Router>
  );
};

export default withAuthentication(App);