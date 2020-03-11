import React from 'react';

import PasswordForgotForm from "../PasswordForget/PasswordForgetForm";
import PasswordChangeForm from "../PasswordChange";
import {AuthUserContext, withAuthorization} from '../Session';


const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgotForm/>
        <PasswordChangeForm/>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => {
  console.log(authUser);
  return !!authUser;
};

export default withAuthorization(condition)(AccountPage);