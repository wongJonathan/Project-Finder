import React from 'react';

import SignInForm from "./SignInForm";
import SignUpLink from "../SignUp/SignUpLink";
import PasswordForgetLink from "../PasswordForget/PasswordFogetLink";


const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm/>
      <PasswordForgetLink />
      <SignUpLink/>
    </div>
  );
};
export default SignInPage;