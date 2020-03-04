import React from 'react';
import SignInForm from "./SignInForm";
import SignUpLink from "../SignUp/SignUpLink";


const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm/>
      <SignUpLink/>
    </div>
  );
};
export default SignInPage;