import React from 'react';

import SignUpForm from './SignUpForm';
import './index.sass';


const SignUpPage = () => (
  <div className="signup-page">
    <div className="signup-card">
      <div className="signup-name">Squad Finder</div>
      <div className="signup-header">Create account</div>
      <SignUpForm />
      <hr />
      <button type="button" className="signup-google">Sign up with Google</button>
    </div>
  </div>
);
export default SignUpPage;
