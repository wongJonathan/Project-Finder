import React, { ReactElement } from 'react';

import SignUpForm from './SignUpForm';
import './index.sass';


const SignUpPage = (): ReactElement => (
  <div className="signup-page">
    <div className="signup-card">
      <div className="signup-header">Create account</div>
      <SignUpForm />
      <hr />
      <button type="button" className="signup-google">Sign up with Google</button>
    </div>
  </div>
);
export default SignUpPage;
